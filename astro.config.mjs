import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
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
    }),
  ],
  output: 'server',
  adapter: vercel(),
  // site: 'https://zjunbin1286.github.io',
  // base: 'joey-blog',
});
