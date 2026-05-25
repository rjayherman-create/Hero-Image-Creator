import React from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import {
  ImageIcon,
  Monitor,
  Palette,
  Smartphone,
  Sparkles,
  Wand2,
} from "lucide-react";
import "./index.css";

type HeroForm = {
  appName: string;
  description: string;
  style: string;
  colors: string;
  device: boolean;
  humans: boolean;
  layout: string;
};

const styles = [
  "SaaS",
  "Corporate",
  "Finance",
  "Healthcare",
  "Cybersecurity",
  "Startup",
  "AI",
  "Real Estate",
];

const colorOptions = ["Blue", "Purple", "Black", "Green", "Orange", "Minimal White"];
const layouts = ["Left Text / Right Image", "Centered Hero", "Split Screen", "Full Background"];

function buildPrompt(form: HeroForm) {
  return `
Create a modern high-converting website hero image.

Business Name: ${form.appName || "Untitled App"}

Description:
${form.description || "A polished startup product landing page."}

Style:
${form.style}

Primary Colors:
${form.colors}

Layout:
${form.layout}

Include Device Mockup:
${form.device ? "Yes" : "No"}

Include Human Figures:
${form.humans ? "Yes" : "No"}

Requirements:
- Website-ready hero section
- Professional SaaS style
- Clean whitespace
- Modern startup aesthetic
- UI/UX focused
- Responsive composition
- High-end landing page look
- Cinematic lighting
- Conversion-focused design
`;
}

function HeroImageCreator() {
  const [form, setForm] = React.useState<HeroForm>({
    appName: "",
    description: "",
    style: "SaaS",
    colors: "Blue",
    device: true,
    humans: false,
    layout: "Left Text / Right Image",
  });
  const [loading, setLoading] = React.useState(false);
  const [generatedImage, setGeneratedImage] = React.useState("");
  const [promptPreview, setPromptPreview] = React.useState("");

  async function generateHero() {
    setLoading(true);
    const prompt = buildPrompt(form);
    setPromptPreview(prompt.trim());

    try {
      const response = await fetch("/api/generate-hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, form }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = (await response.json()) as { imageUrl?: string };
      setGeneratedImage(data.imageUrl ?? "");
    } catch (error) {
      console.error(error);
      alert("Generation failed. Check that the API server is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0f172a] p-4 text-white sm:p-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.section
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-blue-500 p-3">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Hero Image Creator</h1>
              <p className="text-gray-400">Generate website-ready hero images</p>
            </div>
          </div>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm text-gray-300">Business / App Name</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none transition focus:border-blue-400"
              placeholder="Test Pilot"
              value={form.appName}
              onChange={(event) => setForm({ ...form, appName: event.target.value })}
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm text-gray-300">Description</span>
            <textarea
              rows={5}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 outline-none transition focus:border-blue-400"
              placeholder="Describe your business or startup..."
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
            />
          </label>

          <div className="mb-5">
            <span className="mb-2 block text-sm text-gray-300">Style</span>
            <div className="grid grid-cols-2 gap-3">
              {styles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setForm({ ...form, style })}
                  className={`rounded-xl border p-3 transition-all ${
                    form.style === style ? "border-blue-400 bg-blue-500" : "border-white/10 bg-white/5"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <span className="mb-2 block text-sm text-gray-300">Brand Colors</span>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm({ ...form, colors: color })}
                  className={`rounded-xl border p-3 text-sm transition-all ${
                    form.colors === color ? "border-purple-400 bg-purple-500" : "border-white/10 bg-white/5"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Palette className="h-4 w-4" />
                    {color}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm text-gray-300">Hero Layout</span>
            <select
              value={form.layout}
              onChange={(event) => setForm({ ...form, layout: event.target.value })}
              className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none"
            >
              {layouts.map((layout) => (
                <option key={layout}>{layout}</option>
              ))}
            </select>
          </label>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setForm({ ...form, device: !form.device })}
              className={`flex items-center justify-center gap-3 rounded-2xl border p-4 transition-all ${
                form.device ? "border-green-400 bg-green-500/20" : "border-white/10 bg-white/5"
              }`}
            >
              <Monitor className="h-5 w-5" />
              Device Mockup
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, humans: !form.humans })}
              className={`flex items-center justify-center gap-3 rounded-2xl border p-4 transition-all ${
                form.humans ? "border-pink-400 bg-pink-500/20" : "border-white/10 bg-white/5"
              }`}
            >
              <Smartphone className="h-5 w-5" />
              Human Figures
            </button>
          </div>

          <button
            type="button"
            onClick={generateHero}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-lg font-bold transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Wand2 className="h-5 w-5" />
            {loading ? "Generating Hero Image..." : "Generate Hero Image"}
          </button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="min-h-[700px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
        >
          <div className="flex items-center gap-3 border-b border-white/10 p-5">
            <ImageIcon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Hero Preview</h2>
          </div>

          <div className="grid min-h-[520px] place-items-center p-6 sm:p-8">
            {!generatedImage ? (
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-3xl bg-white/5">
                  <Sparkles className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">Your Hero Image Will Appear Here</h3>
                <p className="mx-auto max-w-md text-gray-400">
                  Generate cinematic website hero sections optimized for SaaS landing pages and startups.
                </p>
              </div>
            ) : (
              <img
                src={generatedImage}
                alt="Generated hero"
                className="w-full rounded-2xl border border-white/10 shadow-2xl"
              />
            )}
          </div>

          {promptPreview ? (
            <div className="border-t border-white/10 p-5">
              <h3 className="mb-2 text-sm font-semibold text-gray-300">Prompt sent to API</h3>
              <pre className="max-h-48 overflow-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-gray-300">
                {promptPreview}
              </pre>
            </div>
          ) : null}
        </motion.section>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroImageCreator />
  </React.StrictMode>,
);
