# snarefin.me

Portfolio and blog for Shamsunnur Ibn Arefin, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4, following the design handoff in `../Arefin's portfolio and blog/design_handoff_snarefin_portfolio/`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com). Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY` to your access key. Without a key, the form falls back to opening the visitor's email client.

## Adding a blog post

Create `src/content/posts/<slug>/index.mdx` with frontmatter:

```yaml
---
title: "Post title"
date: "2026-01-01"
type: technical # or journal
excerpt: "One or two sentences for cards and <meta description>."
cover: "cover — short description" # placeholder label shown on the striped cover art
readTime: 7 # optional; computed from word count if omitted
attachments: # optional
  - { file: "./notes.pdf", label: "notes.pdf" }
draft: false
---
```

Drop any images, video, or attachment files referenced from the post next to `index.mdx`. Attachments are served from `/blog/<slug>/files/<name>` and their size is read from disk automatically.

Available MDX components: `Figure`, `Gallery`, `Video`, `GradientDescent`.

Currently only one real post is published — "Gradient descent, one step at a time" — since the rest of the posts in the design handoff's `CONTENT.md` are explicitly placeholders.

## Editing experience / education / projects

These are real, final content and live in `src/content/data/*.ts`.

## Deploying

Push to GitHub, import the repo in Vercel, then add the `snarefin.me` domain and point its DNS at Vercel.
