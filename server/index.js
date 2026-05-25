import "dotenv/config";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 8787);

app.use(express.json({ limit: "1mb" }));

function svgMockup(form = {}) {
  const appName = form.appName || "Your App";
  const description = form.description || "Website-ready hero image concept";
  const style = form.style || "SaaS";
  const colors = form.colors || "Blue";
  const layout = form.layout || "Left Text / Right Image";
  const palette = {
    Blue: ["#1d4ed8", "#38bdf8"],
    Purple: ["#7c3aed", "#f472b6"],
    Black: ["#111827", "#64748b"],
    Green: ["#047857", "#34d399"],
    Orange: ["#c2410c", "#fbbf24"],
    "Minimal White": ["#f8fafc", "#94a3b8"],
  }[colors] ?? ["#1d4ed8", "#38bdf8"];

  const safe = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .slice(0, 120);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="850" viewBox="0 0 1400 850">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette[0]}"/>
      <stop offset="100%" stop-color="${palette[1]}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="30" stdDeviation="24" flood-color="#020617" flood-opacity=".32"/>
    </filter>
  </defs>
  <rect width="1400" height="850" fill="#0f172a"/>
  <rect x="55" y="55" width="1290" height="740" rx="42" fill="url(#bg)" opacity=".92"/>
  <circle cx="1130" cy="165" r="190" fill="#ffffff" opacity=".14"/>
  <circle cx="235" cy="710" r="180" fill="#ffffff" opacity=".10"/>
  <g transform="translate(112 142)">
    <text x="0" y="0" fill="#e0f2fe" font-family="Inter,Arial" font-size="30" font-weight="800">${safe(style)} Hero Concept</text>
    <text x="0" y="92" fill="#ffffff" font-family="Inter,Arial" font-size="78" font-weight="900">${safe(appName)}</text>
    <text x="0" y="156" fill="#dbeafe" font-family="Inter,Arial" font-size="34" font-weight="600">${safe(description)}</text>
    <rect x="0" y="238" width="214" height="64" rx="20" fill="#ffffff"/>
    <text x="34" y="280" fill="#0f172a" font-family="Inter,Arial" font-size="24" font-weight="800">Get Started</text>
    <rect x="240" y="238" width="196" height="64" rx="20" fill="#ffffff" opacity=".18"/>
    <text x="278" y="280" fill="#ffffff" font-family="Inter,Arial" font-size="24" font-weight="800">View Demo</text>
  </g>
  <g transform="translate(800 170)" filter="url(#shadow)">
    <rect x="0" y="0" width="430" height="320" rx="34" fill="#ffffff"/>
    <rect x="32" y="36" width="180" height="24" rx="12" fill="${palette[0]}" opacity=".26"/>
    <rect x="32" y="86" width="350" height="34" rx="17" fill="#0f172a" opacity=".12"/>
    <rect x="32" y="142" width="260" height="22" rx="11" fill="#0f172a" opacity=".10"/>
    <rect x="32" y="202" width="130" height="56" rx="18" fill="${palette[0]}"/>
    <rect x="188" y="202" width="194" height="56" rx="18" fill="${palette[1]}" opacity=".32"/>
  </g>
  <text x="112" y="752" fill="#e2e8f0" font-family="Inter,Arial" font-size="24" font-weight="700">Layout: ${safe(layout)} · Mock preview generated locally</text>
</svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

app.post("/api/generate-hero", async (req, res) => {
  const { prompt, form } = req.body ?? {};

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.json({
      imageUrl: svgMockup(form),
      mode: "mock",
    });
  }

  return res.status(501).json({
    error:
      "OPENAI_API_KEY is set, but the real image-generation adapter has not been enabled yet. Replace this block with your preferred OpenAI Images API call.",
  });
});

app.listen(port, () => {
  console.log(`Hero Image Creator API running on http://localhost:${port}`);
});
