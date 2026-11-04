import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import starlightImageZoom from 'starlight-image-zoom'
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Joey',
      favicon: '/avatar.png',
      social: {
        github: 'https://github.com/zjunbin1286',
      },
      sidebar: [
        {
          label: 'JavaScript',
          items: [
            { label: 'ES6 中数组做了哪些新扩展？', slug: 'articles/javascript/01-es6' },
            { label: '关于 JavaScript 的本地存储方案', slug: 'articles/javascript/02-localstorage' },
            { label: '你真的了解 “对象解构赋值” 吗？关于对象解构的全面解析 ✌', slug: 'articles/javascript/03-deconstruction-assignment' },
            { label: '一篇文章带你搞懂 this 的四个绑定规则 ✍', slug: 'articles/javascript/04-this-four-binding-rules' },
            { label: '关于 "尾调用优化" 的那些事儿 👏', slug: 'articles/javascript/05-tail-call' },
            { label: 'JavaScript 自定义双击事件，CustomEvent 对象的使用详解', slug: 'articles/javascript/06-custom-event-double-click' },
            { label: '关于JavaScript实现继承的六大方案，你都了解过吗？', slug: 'articles/javascript/07-six-types-inheritance' },
            { label: '深度解析 JavaScript 严格模式：利弊长远的考量', slug: 'articles/javascript/08-strict-mode' },
            { label: '深入 JavaScript 模块：建立可扩展的应用', slug: 'articles/javascript/09-module-expand' },
            { label: 'JavaScript 加载原理解析 -- Async Vs Defer', slug: 'articles/javascript/10-async-defer' },
            { label: '深入浅出防抖与节流函数', slug: 'articles/javascript/11-debounce-throttle' },
            { label: '关于 JavaScript 编译原理以及作用域的深入探讨', slug: 'articles/javascript/12-js-compile-scope' },
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
            { label: 'CSS 中的 ch 单位', slug: 'articles/html5-css3/06-css-ch-unit' },
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
            { label: 'Vue 中的 nextTick 有什么作用？', slug: 'articles/vue/07-vue-nexttick' },
            { label: 'Vue3状态管理器Vuex4.0的进阶使用方案！', slug: 'articles/vue/08-vuex4-plus' },
            { label: '关于 Vue3 中的 <script setup> 语法使用详解', slug: 'articles/vue/09-script-setup' },
            { label: '浅谈 Vue3 中的状态管理，为什么推荐Pinia？', slug: 'articles/vue/10-why-pinia' },
            { label: '浅谈 Vue3 组件通信', slug: 'articles/vue/11-components-communication' },
          ],
        },
        {
          label: 'React',
          items: [
            { label: '快速体验 React 开发基础入门指南', slug: 'articles/react/01-quick-learn-react' },
            { label: '关于 React 的几个常用技巧', slug: 'articles/react/02-common-techniques' },
            { label: 'React-Router6 全面解析', slug: 'articles/react/03-router6' },
            { label: 'Redux+React-Redux 最新入门实战指南💥', slug: 'articles/react/04-redux_react-redux' },
            { label: 'React18 中关于 useId() 的使用', slug: 'articles/react/05-useid' },
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
        {
          label: '前端必知必会',
          items: [
            { label: '说说 Vue 中的组件和插件有什么区别？', slug: 'articles/interview/01-component-plugin' },
            { label: '说说你对 Set、Map 的理解', slug: 'articles/interview/02-set-map' },
            { label: '谈谈你知道的 DOM 的常见操作', slug: 'articles/interview/03-dom-operate' },
            { label: '说说 var、let、const 三者的区别', slug: 'articles/interview/04-var-let-const' },
            { label: '40 道 Promise 输出题，你都会了吗？🔥', slug: 'articles/interview/05-promise-forty-questions' },
            { label: '说说 JavaScript 中类型的转换机制', slug: 'articles/interview/06-type-transformation' },
            { label: '说说你对 Node 中的 Stream 的理解', slug: 'articles/interview/07-node-stream' },
            { label: '说说你对事件循环的理解', slug: 'articles/interview/08-event-loop' },
          ]
        },
        {
          label: '方法实现',
          items: [
            { label: '手写 call 方法', slug: 'articles/handwriting-method/01-call' },
            { label: '手写 apply 方法', slug: 'articles/handwriting-method/02-apply' },
            { label: '手写 bind 方法', slug: 'articles/handwriting-method/03-bind' },
            { label: '通用组合函数 compose 的实现', slug: 'articles/handwriting-method/04-compose' },
            { label: '柯里化函数 currying 的实现', slug: 'articles/handwriting-method/05-currying' },
          ],
        },
        {
          label: '更多分享',
          items: [
            { label: '知道了web的攻击方式，还不快防起来？', slug: 'articles/shared/01-web-attack-methods' },
          ],
        },
        {
          label: '工作问题记录',
          items: [
            { label: '浏览器内置 API：ResizeObserver 监听元素尺寸变化', slug: 'project-solution/01-resize-observer' },
            { label: '使用深度优先搜索查找父子级关联的数据', slug: 'project-solution/02-depth-first-search-parent-children' },
            { label: 'lodash 中 differenceWith 以及 ahooks 中 usePrevious 的用法', slug: 'project-solution/03-lodash-differencewith-ahooks_useprevious' },
            { label: '创建离屏 Canvas 将图片进行旋转，并转为二进制流', slug: 'project-solution/04-canvas-handle-image-rotate' },
            { label: '将 JSON 对象转换为 Blob 并用 FormData 请求接口', slug: 'project-solution/05-blob-type-json-to-blob-formdata' },
            { label: '将远程图片转换为 Buffer、Blob 数据', slug: 'project-solution/06-remote-image-link-to-buffer-blob' },
            { label: '用 URLSearchParams 与 Object.fromEntries 处理 URL query', slug: 'project-solution/07-urlsearchparams-object-fromentries' },
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
      // 首次访问默认深色主题。Starlight 的 ThemeProvider 读 localStorage，
      // 这里在它之前写入一次；用户之后手动切到「跟随系统」不会被反复改回。
      head: [
        {
          tag: 'script',
          content:
            "try{if(!localStorage.getItem('starlight-theme')&&!localStorage.getItem('joey-theme-init')){localStorage.setItem('starlight-theme','dark');localStorage.setItem('joey-theme-init','1')}}catch(e){}",
        },
      ],
      // 重写组件
      components: {
        SocialIcons: './src/components/NavBar/index.astro',
        Footer: './src/components/Footer/index.astro',
        // 原生 select 的下拉弹层由系统绘制，焦点框改不动，换成自绘的三段式开关
        ThemeSelect: './src/components/ThemeSwitch/index.astro',
      },
      // 渲染代码块的配置
      expressiveCode: {
        styleOverrides: { borderRadius: '0.3rem' },
      },
      // 文章的最后修改时间
      lastUpdated: true,
      // 注册插件
      plugins: [starlightImageZoom()],
    }),
    react(),
    tailwind(),
    mdx()
  ],
});