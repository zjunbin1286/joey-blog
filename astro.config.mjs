import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Joey',
    favicon: '/avatar.png',
    social: {
      github: 'https://github.com/zjunbin1286',
    },
    sidebar: [
      {
        label: 'Vue',
        items: [
          // Each item here is one entry in the navigation menu.
          { label: '全面拥抱Vue3，Vuex4 最新详解教程！', slug: 'articles/vue/vuex4' },
        ],
      },
      {
        label: 'React',
        items: [
          { label: 'React-Router6 全面解析', slug: 'articles/react/router6' },
        ],
      },
      {
        label: 'JavaScript',
        items: [
          { label: 'ES6中数组做了哪些新扩展？', slug: 'articles/javascript/es6' },
        ],
      },
      {
        label: 'Html5&CSS3',
        items: [
          { label: '浅析HTML页面的生命周期', slug: 'articles/html5-css3/life-cycle' },
        ],
      },
      // {
      //   label: 'Reference',
      //   autogenerate: { directory: 'reference' },
      // },
    ],
    // 使用自定义css
    customCss: [
      './src/styles/custom.css',
    ],
    // 重写组件
    components: {
      SocialIcons: './src/components/NavBar/index.astro',
      Footer: './src/components/Footer/index.astro',
    },
    // 渲染代码块的配置
    expressiveCode: {
      styleOverrides: { borderRadius: '0.3rem' },
    },
    lastUpdated: true,
  }), react(), tailwind()],
});