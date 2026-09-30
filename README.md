# aievalsai.com

Personal blog about AI evaluations, agents, MCP testing, and quality
engineering. Built with [Astro](https://astro.build) + MDX, deployed as a
static site on Cloudflare Pages.

## Stack

- **Astro** (static output) with **MDX**, **sitemap**, and **RSS**
- TypeScript, content collections for posts
- No UI framework; plain CSS with a system font stack and automatic dark mode
- Node pinned to **22 LTS** (see `.nvmrc`)

## Local development

```bash
nvm use          # uses Node 22 from .nvmrc (or: nvm install)
npm install
npm run dev      # http://localhost:4321
```

| Command           | Action                                        |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server at `localhost:4321`      |
| `npm run build`   | Build the production site to `./dist/`        |
| `npm run preview` | Preview the built site locally                |

## How to add a post

1. Create `src/content/posts/my-post.mdx`.
2. Add frontmatter:

   ```mdx
   ---
   title: 'My post title'
   description: 'One-line summary used for SEO and the post list.'
   pubDate: 2026-09-29
   tags: ['evals', 'testing']
   draft: false
   ---
   ```

3. Write the body in Markdown/MDX. To use the callout component:

   ```mdx
   import Callout from '../../components/Callout.astro';

   <Callout type="tip" title="Tip">Body text.</Callout>
   ```

4. Commit and push. Cloudflare rebuilds automatically.

### Drafts

Set `draft: true` in frontmatter. Draft posts are:

- **Visible** when running `npm run dev` (so you can preview them)
- **Excluded** from production builds, the posts index, the home page, and RSS

Draft filtering lives in one place: `src/lib/posts.ts` (`getPublishedPosts`).

## Labs (interactive HTML documents)

Self-contained interactive HTML files (simulations, maps, explainers) are
served verbatim from `public/labs/` and listed on the `/labs` page.

**To add one:**

1. Drop the `.html` file into `public/labs/` with a clean kebab-case name,
   e.g. `public/labs/my-concept.html`. It's served as-is at
   `/labs/my-concept.html` (no processing — raw HTML stays exactly as
   generated).
2. Add an entry to the `labs` array in `src/pages/labs/index.astro`
   (title, description, file, date).
3. Optionally write a companion blog post that embeds it in an `<iframe>`
   and links to the full-screen version (see
   `src/content/posts/rag-pattern-atlas.mdx` for the pattern).

Keep each file self-contained (inline CSS/JS; external CDN links are fine
over HTTPS). Nothing about an employer, internal projects, or unreleased
products.

## Deployment

Deployed via **Cloudflare Pages**, Git-integrated:

- Push to `main` → production deploy at https://aievalsai.com
- Push to any other branch → a preview deploy at a unique `*.pages.dev` URL

**Build settings (Cloudflare Pages):**

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION = 22`

## Project structure

```
src/
  components/   BaseHead (SEO/OG), Header, Footer, Callout
  layouts/      BaseLayout, PostLayout
  content/
    posts/      *.mdx blog posts
  lib/          posts.ts (SITE metadata + getPublishedPosts)
  pages/        index, about, posts/, rss.xml.ts, 404
  styles/       global.css
astro.config.mjs
```

## TODO (out of scope for now)

- [ ] Payments / digital product delivery
- [ ] Newsletter signup
- [ ] Analytics
- [ ] Comments
- [ ] Email forwarding
- [ ] Legal pages (privacy, terms)
- [ ] Flesh out the About page with real bio, links, and contact
