import { getCollection } from 'astro:content';

/** Site-wide metadata used across pages and feeds. */
export const SITE = {
  title: 'AI Evals AI',
  description:
    'Notes on AI evaluations, agents, MCP testing, and quality engineering.',
  author: 'Kannan',
  url: 'https://aievalsai.com',
};

/**
 * Get published posts, newest first.
 *
 * Drafts (draft: true) are hidden in production builds but visible while
 * running `astro dev`, so you can preview them locally. This is the single
 * place draft filtering lives — home, posts index, RSS and getStaticPaths
 * all call it, so they can never disagree about what is published.
 */
export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
