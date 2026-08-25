// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and Open Graph tags.
  site: 'https://www.milehighbulldog.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});
