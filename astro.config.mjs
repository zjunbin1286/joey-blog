import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Joey',
    social: {
      github: 'https://github.com/zjunbin1286',
    },
    sidebar: [
      {
        label: 'Guides',
        items: [
          // Each item here is one entry in the navigation menu.
          { label: 'Example Guide', slug: 'guides/example' },
        ],
      },
      {
        label: 'Reference',
        autogenerate: { directory: 'reference' },
      },
    ],
  }), react(), tailwind()],
});