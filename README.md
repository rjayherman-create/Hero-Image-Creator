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
OPENAI_IMAGE_MODEL=gpt-image-1
OPENAI_IMAGE_SIZE=1536x1024
OPENAI_IMAGE_QUALITY=medium
```

Without a key, `/api/generate-hero` returns a generated SVG mockup so the product flow works immediately.

The backend reads the key from `process.env.OPENAI_API_KEY` and calls OpenAI from the server route at `POST /api/generate-hero`, keeping the key out of the browser.
