# Konuko Foundation Website

A GitHub-ready starter website for **Konuko Foundation**, built with **Next.js 16** and prepared for **Sanity CMS** content management.

## Included pages

- Home
- About
- Programs
- Impact
- Annual Reports
- Get Involved
- Contact
- `/studio` Sanity Studio route

## 1. Run locally

Install Node.js 22.12+ and then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Connect Sanity

Create a Sanity project, then copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-09-01
```

In Sanity project settings, add `http://localhost:3000` to CORS origins for local editing. Then restart the dev server and open:

`http://localhost:3000/studio`

The Studio includes schemas for:

- Programs
- Founders
- Impact stories
- Annual reports (including PDF upload)
- Site settings

## 3. GitHub

Create a new GitHub repository and push this folder:

```bash
git init
git add .
git commit -m "Initial Konuko Foundation website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 4. Vercel

Import the GitHub repository into Vercel. Add the same Sanity environment variables in Vercel → Project Settings → Environment Variables.

## Important before launch

- Replace the starter contact email.
- Add the official logo when available.
- Add verified impact numbers only after projects begin.
- Add official donation details only after the foundation decides its approved payment channels.
- Replace demo photography with Konuko Foundation project photography as soon as available.

## Annual reports

The Annual Reports page reads from Sanity. In `/studio`, create an **Annual Report**, add the year, summary and PDF, then publish. It will automatically appear at `/reports`.
