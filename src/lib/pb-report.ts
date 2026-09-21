import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
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

// Bake every <img> in the clone into a data URL before snapshotting, so the
// capture uses exactly the pixels the live page shows.
async function inlineImagesAsDataUrls(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    imgs.map(async (img) => {
      try {
        const res = await fetch(img.currentSrc || img.src);
        if (!res.ok) return;
        img.removeAttribute("srcset");
        img.removeAttribute("sizes");
        img.src = await readBlobAsDataUrl(await res.blob());
      } catch {
        // leave the original source in place
      }
    }),
  );
}

// Renders the app page background (theme color + pattern tile) as one
// seamless full-bleed A5 image, so the whole PDF page carries it.
async function renderPageBackground(
  backgroundColor: string,
  backgroundImage: string,
): Promise<string | null> {
  try {
    const match = /url\("?(.+?)"?\)/.exec(backgroundImage);
    if (!match) return null;
    const tile = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("could not load pattern"));
      img.src = match[1];
    });
    // A5 in CSS px at 96dpi: 148mm x 210mm.
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(559.4 * scale);
    canvas.height = Math.round(793.7 * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.save();
    ctx.scale(scale, scale);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, 559.4, 793.7);
    const pattern = ctx.createPattern(tile, "repeat");
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 559.4, 793.7);
    }
    ctx.restore();
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

export async function downloadPbReport(total: number) {
  void total;
  try {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (nodes.length === 0) throw new Error("score sections not found");

    // Off-screen stage carrying the app body background (theme + pattern).
    const bodyStyle = getComputedStyle(document.body);
    const stage = document.createElement("div");
    stage.setAttribute("aria-hidden", "true");
    stage.style.cssText =
      "position:fixed;left:-20000px;top:0;pointer-events:none;";
    stage.style.backgroundColor = bodyStyle.backgroundColor;
    stage.style.backgroundImage = bodyStyle.backgroundImage;
    document.body.appendChild(stage);

    const snapshots: { url: string; w: number; h: number }[] = [];
    try {
      for (const node of nodes) {
        const clone = node.cloneNode(true) as HTMLElement;
        // The only thing removed from the report: the download CTA buttons.
        clone.querySelectorAll("button").forEach((b) => b.remove());
        clone.style.width = `${node.offsetWidth}px`;
        clone.style.margin = "0";
        stage.appendChild(clone);
        await inlineImagesAsDataUrls(clone);
        const url = await toPng(clone, { pixelRatio: 2 });
        const size = await loadImageSize(url);
        snapshots.push({ url, w: size.w, h: size.h });
        clone.remove();
      }
    } finally {
      stage.remove();
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
    const pageBg = await renderPageBackground(
      bodyStyle.backgroundColor,
      bodyStyle.backgroundImage,
    );
    if (pageBg) {
      pdf.addImage(pageBg, "PNG", 0, 0, 148, 210);
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
  } catch {
    // fallback to print dialog
    window.print();
  }
}
