import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import starlightImageZoom from 'starlight-image-zoom'

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
          { label: 'Vue 内置指令大全', slug: 'articles/vue/built-in-irectives' },
          { label: 'Vue 常用修饰符详解', slug: 'articles/vue/event-handling' },
          { label: 'Vue3 组合式 API：生命周期钩子总结', slug: 'articles/vue/lifecycle-hooks' },
          { label: '全面拥抱Vue3，Vuex4 最新详解教程！', slug: 'articles/vue/vuex4' },
          { label: '新一代的状态管理器？关于 Pinia 的全方位解析！', slug: 'articles/vue/pinia' },
          { label: '关于Vue-Router4路由导航守卫的全面解析', slug: 'articles/vue/vue-router4' },
        ],
      },
      {
        label: 'React',
        items: [
          { label: '快速体验 React 开发基础入门指南', slug: 'articles/react/quick-learn-react' },
          { label: 'React-Router6 全面解析', slug: 'articles/react/router6' },
          { label: '关于 React 的几个常用技巧', slug: 'articles/react/common-techniques' },
        ],
      },
      {
        label: 'JavaScript',
        items: [
          { label: '手写 call 方法', slug: 'articles/javascript/call' },
          { label: '手写 apply 方法', slug: 'articles/javascript/apply' },
          { label: '手写 bind 方法', slug: 'articles/javascript/bind' },
          { label: 'ES6 中数组做了哪些新扩展？', slug: 'articles/javascript/es6' },
          { label: '关于 JavaScript 的本地存储方案', slug: 'articles/javascript/localstorage' },
        ],
      },
      {
        label: 'Html5&CSS3',
        items: [
          { label: '浅析HTML页面的生命周期', slug: 'articles/html5-css3/life-cycle' },
          { label: '如何使用 CSS 提高页面性能？', slug: 'articles/html5-css3/page-performance' },
          { label: '前端页面之“回流重绘”', slug: 'articles/html5-css3/reflux-redrawing' },
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
    // 文章的最后修改时间
    lastUpdated: true,
    // 注册插件
    plugins: [starlightImageZoom()],
  }), react(), tailwind()],
});