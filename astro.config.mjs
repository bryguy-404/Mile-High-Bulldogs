// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and Open Graph tags. Update to the production
  // domain before deploying to Cloudflare Pages.
  site: 'https://milehighbulldogs.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});
