# Manideep Pabbisetty – DevOps & Cloud Engineering Portfolio

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run lint && npx tsc --noEmit
npm run build && npm start
```

## Edit content
All content lives in `src/data/`:
- `profile.ts` – name, links, about, experience, education, credentials
- `projects.ts` – projects; set `repo` once a repository URL is confirmed (null shows a "not published yet" state)
- `skills.ts` – skills and proficiency levels (hands-on / working / basic)
- `diagrams.ts` – architecture diagrams (implemented vs illustrative nodes)

Resume: put the PDF at `public/resume/Manideep_Pabbisetty_Resume.pdf` (see `public/resume/README.md`).

## Environment
`NEXT_PUBLIC_SITE_URL` – public site URL for canonical/OG/sitemap (see `.env.example`). Set it at build time.

## Deploy
**Vercel:** import the repo, set `NEXT_PUBLIC_SITE_URL`, deploy.

**Docker:**
```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.example -t portfolio .
docker run -d --restart unless-stopped -p 127.0.0.1:3000:3000 portfolio
```

**Ubuntu VPS + Nginx + HTTPS:** run the container (or `npm run build && npm start` under PM2) bound to 127.0.0.1:3000, copy `deploy/nginx.conf.example` to `/etc/nginx/sites-available/portfolio`, enable it, then:
```bash
sudo certbot --nginx -d your-domain.example -d www.your-domain.example
```
Certbot installs automatic renewal.
