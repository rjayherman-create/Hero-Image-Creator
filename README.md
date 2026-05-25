# Hero Image Creator

Create website-ready hero image concepts for SaaS, startup, and business landing pages.

## Run Locally

```bash
npm install
npm run dev
```

The Vite app runs on `http://localhost:5173` and proxies `/api` requests to the local Express server.

## OpenAI Ready

Add an API key to `.env` when you are ready to connect real image generation:

```bash
OPENAI_API_KEY=your_key_here
```

Without a key, `/api/generate-hero` returns a generated SVG mockup so the product flow works immediately.
