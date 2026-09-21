import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { capture, captureException } from "@/lib/posthog";
import { scorecard_v1 } from "@/config/scorecard-v1";

export function getMaxTotal() {
  const maxOptionScore = Math.max(
    ...scorecard_v1.questions.flatMap((q) => q.options.map((o) => o.score)),
  );
  return scorecard_v1.questions.length * maxOptionScore;
}

export function toPercent(total: number) {
  return Math.round((total / getMaxTotal()) * 100);
}

export function getBandForTotal(total: number) {
  return (
    scorecard_v1.interpretationBands.find(
      (b) => total >= b.range[0] && total <= b.range[1],
    ) ?? scorecard_v1.interpretationBands[0]
  );
}

export function getBandBySlug(slug: string | null) {
  if (!slug) return null;
  return scorecard_v1.interpretationBands.find((b) => b.slug === slug) ?? null;
}

const RESULT_HEADLINES: Record<string, string> = {
  flatlining: "Your Personal Brand Has a Pulse. Right Now, It's Barely Beating.",
  unstable: "Your Personal Brand Has a Pulse. It's Beating, But It's Uneven.",
  stabilizing: "Your Personal Brand Has a Pulse. It's Getting Steadier.",
  compounding: "Your Personal Brand Has a Pulse. It's Compounding.",
};

const DEFAULT_HEADLINE =
  "Your Personal Brand Has a Pulse. Here's What It's Telling You.";

export function getResultHeadline(slug: string | null) {
  if (!slug) return DEFAULT_HEADLINE;
  return RESULT_HEADLINES[slug] ?? DEFAULT_HEADLINE;
}

const SECTION_IDS = [
  "pb-section-overall",
  "pb-section-vitals",
  "pb-section-breakdown",
];

// Desktop canvas + unconditional equivalents of the `md:` rules used inside
// the three score sections (SectionWrapper base + per-section overrides).
// Media queries follow the live viewport, so on a narrow screen the capture
// would come out stacked — these force the desktop arrangement instead.
const DESKTOP_CANVAS_WIDTH = 1100;
const DESKTOP_OVERRIDES = [
  ".pb-desktop-capture .md\\:flex-row{flex-direction:row}",
  ".pb-desktop-capture .md\\:flex-row-reverse{flex-direction:row-reverse}",
  ".pb-desktop-capture .md\\:items-center{align-items:center}",
  ".pb-desktop-capture .md\\:pt-16{padding-top:4rem}",
  ".pb-desktop-capture .md\\:pb-20{padding-bottom:5rem}",
  ".pb-desktop-capture .md\\:pt-0{padding-top:0}",
].join("");

function loadImageSize(url: string) {
  return new Promise<{ w: number; h: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => reject(new Error("could not read snapshot"));
    img.src = url;
  });
}

function readBlobAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("could not read image"));
    reader.readAsDataURL(blob);
  });
}

function loadImageElement(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("could not load image"));
    img.src = src;
  });
}

// oklch() -> srgb() so canvas fills use an exact, universally-parsed color.
// Canvas2D implementations are inconsistent about accepting oklch() in
// fillStyle; the conversion keeps the theme color bit-identical.
function oklchToRgbString(color: string): string | null {
  const match =
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/.exec(
      color,
    );
  if (!match) return null;
  const L = Number(match[1]);
  const C = Number(match[2]);
  const h = (Number(match[3]) * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = L + 0.3963377774 * a + 0.2158037573 * b;
  const m = L - 0.1055613458 * a - 0.0638541728 * b;
  const s = L - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l * l * l;
  const m3 = m * m * m;
  const s3 = s * s * s;
  const linear = [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
  const gamma = (v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    const srgb =
      clamped <= 0.0031308
        ? 12.92 * clamped
        : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
    return Math.round(srgb * 255);
  };
  return `rgb(${gamma(linear[0])}, ${gamma(linear[1])}, ${gamma(linear[2])})`;
}

// Snapshot with retries at decreasing resolution — mobile browsers can
// refuse large canvases, in which case a smaller render still beats print.
async function snapshotNode(clone: HTMLElement, startRatio: number) {
  let ratio = startRatio;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await toPng(clone, { pixelRatio: ratio });
    } catch (error) {
      if (attempt === 2) throw error;
      ratio = Math.max(1, ratio - 0.5);
    }
  }
  throw new Error("snapshot failed");
}
async function inlineImagesAsDataUrls(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll("img"));
  let ok = 0;
  let failed = 0;
  await Promise.all(
    imgs.map(async (img) => {
      try {
        const res = await fetch(img.currentSrc || img.src);
        if (!res.ok) {
          failed++;
          return;
        }
        const dataUrl = await readBlobAsDataUrl(await res.blob());
        // Verify the data URL actually decodes before swapping it in.
        const check = await loadImageElement(dataUrl);
        if (!check.naturalWidth) {
          failed++;
          return;
        }
        img.removeAttribute("srcset");
        img.removeAttribute("sizes");
        img.src = dataUrl;
        ok++;
      } catch {
        // leave the original source in place
        failed++;
      }
    }),
  );
  return { ok, failed };
}

// Renders the app page background (theme color + pattern tile) as one
// seamless full-bleed A5 image, so the whole PDF page carries it.
async function renderPageBackground(
  backgroundColor: string,
  backgroundImage: string,
): Promise<{ url: string | null; patternOk: boolean }> {
  try {
    const match = /url\("?(.+?)"?\)/.exec(backgroundImage);
    if (!match) return { url: null, patternOk: false };
    const tile = await loadImageElement(match[1]);
    if (!tile.naturalWidth) return { url: null, patternOk: false };
    // A5 in CSS px at 96dpi: 148mm x 210mm.
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(559.4 * scale);
    canvas.height = Math.round(793.7 * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return { url: null, patternOk: true };
    ctx.save();
    ctx.scale(scale, scale);
    ctx.fillStyle = oklchToRgbString(backgroundColor) ?? backgroundColor;
    ctx.fillRect(0, 0, 559.4, 793.7);
    const pattern = ctx.createPattern(tile, "repeat");
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 559.4, 793.7);
    }
    ctx.restore();
    return { url: canvas.toDataURL("image/png"), patternOk: true };
  } catch {
    return { url: null, patternOk: false };
  }
}

export async function downloadPbReport(total: number) {
  void total;
  let failedStage = "locate-sections";
  try {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (nodes.length === 0) throw new Error("score sections not found");
    if (nodes.length < SECTION_IDS.length)
      throw new Error(
        `only ${nodes.length} of ${SECTION_IDS.length} sections found`,
      );

    // Off-screen stage carrying the app body background (theme + pattern).
    const bodyStyle = getComputedStyle(document.body);
    const stage = document.createElement("div");
    stage.setAttribute("aria-hidden", "true");
    stage.classList.add("pb-desktop-capture");
    stage.style.cssText =
      "position:fixed;left:-20000px;top:0;pointer-events:none;";
    stage.style.backgroundColor = bodyStyle.backgroundColor;
    stage.style.backgroundImage = bodyStyle.backgroundImage;
    document.body.appendChild(stage);

    // Force desktop arrangement inside the capture, whatever the viewport.
    const forceDesktop = document.createElement("style");
    forceDesktop.textContent = DESKTOP_OVERRIDES;
    document.head.appendChild(forceDesktop);

    const snapshots: { url: string; w: number; h: number }[] = [];
    // Smaller canvases on small screens — same desktop layout, less memory.
    const pixelRatio = window.innerWidth < 768 ? 1.5 : 2;
    let imagesOk = 0;
    let imagesFailed = 0;
    try {
      for (let i = 0; i < nodes.length; i++) {
        failedStage = `snapshot-section-${i}`;
        const node = nodes[i];
        const clone = node.cloneNode(true) as HTMLElement;
        // The only thing removed from the report: the download CTA buttons.
        clone.querySelectorAll("button").forEach((b) => b.remove());
        clone.style.width = `${Math.max(node.offsetWidth, DESKTOP_CANVAS_WIDTH)}px`;
        clone.style.margin = "0";
        stage.appendChild(clone);
        const inlined = await inlineImagesAsDataUrls(clone);
        imagesOk += inlined.ok;
        imagesFailed += inlined.failed;
        const url = await snapshotNode(clone, pixelRatio);
        const size = await loadImageSize(url);
        snapshots.push({ url, w: size.w, h: size.h });
        clone.remove();
      }
    } finally {
      stage.remove();
      forceDesktop.remove();
    }

    if (snapshots.length === 0) throw new Error("nothing captured");

    // Single A5 portrait page: stack all three sections, scaled to fit.
    const pdf = new jsPDF({
      unit: "mm",
      format: "a5",
      orientation: "portrait",
      compress: true,
    });
    const margin = 6;
    const contentW = 148 - margin * 2;
    const contentH = 210 - margin * 2;
    const heights = snapshots.map((s) => (s.h / s.w) * contentW);
    const totalH = heights.reduce((sum, h) => sum + h, 0);
    const fit = totalH > contentH ? contentH / totalH : 1;

    // Whole-page background first, sections float transparently over it.
    failedStage = "compose-pdf";
    const pageBg = await renderPageBackground(
      bodyStyle.backgroundColor,
      bodyStyle.backgroundImage,
    );
    if (pageBg.url) {
      pdf.addImage(pageBg.url, "PNG", 0, 0, 148, 210);
    }

    let y = margin;
    snapshots.forEach((snap, i) => {
      const w = contentW * fit;
      const h = heights[i] * fit;
      const x = margin + (contentW - w) / 2;
      pdf.addImage(snap.url, "PNG", x, y, w, h);
      y += h;
    });

    pdf.save("pb-report.pdf");
    capture("pb_report_exported", {
      viewport_width: window.innerWidth,
      pixel_ratio: pixelRatio,
      images_ok: imagesOk,
      images_failed: imagesFailed,
      pattern_ok: pageBg.patternOk,
    });
  } catch (error) {
    captureException(error, {
      context: "pb_report_export",
      stage: failedStage,
      viewport_width:
        typeof window !== "undefined" ? window.innerWidth : "unknown",
    });
    // fallback to print dialog
    window.print();
  }
}
