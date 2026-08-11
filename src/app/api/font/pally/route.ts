import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const file = path.resolve(process.cwd(), "src/assets/fonts/en/Pally/Pally-Regular.ttf");
    const buf = await readFile(file);
    const base64 = buf.toString("base64");
    return new Response(JSON.stringify({ base64 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Font not found" }), { status: 500 });
  }
}
