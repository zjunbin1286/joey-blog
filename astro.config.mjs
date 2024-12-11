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
        label: 'JavaScript',
        items: [
          { label: '手写 call 方法', slug: 'articles/javascript/01-call' },
          { label: '手写 apply 方法', slug: 'articles/javascript/02-apply' },
          { label: '手写 bind 方法', slug: 'articles/javascript/03-bind' },
          { label: '通用组合函数 compose 的实现', slug: 'articles/javascript/04-compose' },
          { label: '柯里化函数 currying 的实现', slug: 'articles/javascript/05-currying' },
          { label: 'ES6 中数组做了哪些新扩展？', slug: 'articles/javascript/06-es6' },
          { label: '关于 JavaScript 的本地存储方案', slug: 'articles/javascript/07-localstorage' },
          { label: '你真的了解 “对象解构赋值” 吗？关于对象解构的全面解析 ✌', slug: 'articles/javascript/08-deconstruction-assignment' },
          { label: '一篇文章带你搞懂 this 的四个绑定规则 ✍', slug: 'articles/javascript/09-this-four-binding-rules' },
          { label: '关于 "尾调用优化" 的那些事儿 👏', slug: 'articles/javascript/10-tail-call' },
        ],
      },
      {
        label: 'Html5&CSS3',
        items: [
          { label: '浅析HTML页面的生命周期', slug: 'articles/html5-css3/01-life-cycle' },
          { label: '如何使用 CSS 提高页面性能？', slug: 'articles/html5-css3/02-page-performance' },
          { label: '前端页面之“回流重绘”', slug: 'articles/html5-css3/03-reflux-redrawing' },
          { label: 'js 和 css 是如何影响DOM树构建的？', slug: 'articles/html5-css3/04-dom-tree-construction' },
          { label: '前端布局之浅谈 BFC', slug: 'articles/html5-css3/05-bfc' },
        ],
      },
      {
        label: 'Vue',
        items: [
          // Each item here is one entry in the navigation menu.
          { label: 'Vue 内置指令大全', slug: 'articles/vue/01-built-in-irectives' },
          { label: 'Vue 常用修饰符详解', slug: 'articles/vue/02-event-handling' },
          { label: 'Vue3 组合式 API：生命周期钩子总结', slug: 'articles/vue/03-lifecycle-hooks' },
          { label: '全面拥抱Vue3，Vuex4 最新详解教程！', slug: 'articles/vue/04-vuex4' },
          { label: '新一代的状态管理器？关于 Pinia 的全方位解析！', slug: 'articles/vue/05-pinia' },
          { label: '关于Vue-Router4路由导航守卫的全面解析', slug: 'articles/vue/06-vue-router4' },
        ],
      },
      {
        label: 'React',
        items: [
          { label: '快速体验 React 开发基础入门指南', slug: 'articles/react/quick-learn-react' },
          { label: 'React-Router6 全面解析', slug: 'articles/react/router6' },
          { label: 'Redux+React-Redux 最新入门实战指南💥', slug: 'articles/react/redux_react-redux' },
          { label: '关于 React 的几个常用技巧', slug: 'articles/react/common-techniques' },
        ],
      },
      {
        label: 'Node',
        items: [
          { label: 'Node入门系列-fs、path 模块的使用（1）', slug: 'articles/node/01-learn-fs-path' },
          { label: 'Node入门系列-http 模块的使用（2）', slug: 'articles/node/02-learn-http' },
          { label: 'Node入门系列-npm 包管理器（3）', slug: 'articles/node/03-learn-npm' },
          { label: 'Node入门系列-Express 框架的简单使用（4）', slug: 'articles/node/04-learn-express' },
          { label: 'Node入门系列-Express 框架的使用 — 路由（5）', slug: 'articles/node/05-learn-express-router' },
          { label: 'Node入门系列-Express 框架的使用 — 编写接口（6）', slug: 'articles/node/06-learn-express-api' },
          { label: 'Node入门系列-Express 框架的使用 — 中间件（7）', slug: 'articles/node/07-learn-middleware' },
          { label: 'Node入门系列-在项目中操作 MySql 数据库（8）', slug: 'articles/node/08-learn-mysql' },
          { label: 'Node入门系列-前后端的开发模式和 Session 身份认证（9）', slug: 'articles/node/09-learn-session' },
          { label: 'Node入门系列-前后端的身份认证 — JWT（10）', slug: 'articles/node/10-learn-jwt' },
        ]
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