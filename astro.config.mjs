import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import starlightImageZoom from 'starlight-image-zoom'
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // canonical、sitemap、RSS 里的绝对地址都靠它，必须写真实域名
  site: 'https://joeybin.cn',
  // 整站仍是构建期生成的静态 HTML，只有 api/ 下标了 prerender=false 的路由
  // 交给 Vercel Function 按需执行（浏览数计数就靠它）
  output: 'static',
  adapter: vercel(),
  integrations: [
    starlight({
      title: 'Joey',
      description: 'Joey 的前端笔记：JavaScript、Vue、React、Node 与工程实践。',
      // 单语言中文站：让 <html lang>、Starlight 自带文案（搜索、目录、翻页、404）
      // 全部走简体中文，不然页面上「On this page」「Previous」和正文中英混排
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
      },
      favicon: '/avatar.png',
      social: {
        github: 'https://github.com/zjunbin1286',
      },
      // 侧边栏由目录自动生成：文件名（01-xxx）即排序，新增文章只写 frontmatter，
      // 不用再回来手动补一条。专栏落地页（各目录的 index.mdx）用 sidebar.hidden 隐掉。
      sidebar: [
        { label: 'JavaScript', autogenerate: { directory: 'articles/javascript' } },
        { label: 'Html5&CSS3', autogenerate: { directory: 'articles/html5-css3' } },
        { label: 'Vue', autogenerate: { directory: 'articles/vue' } },
        { label: 'React', autogenerate: { directory: 'articles/react' } },
        { label: 'Node', autogenerate: { directory: 'articles/node' } },
        { label: '前端必知必会', autogenerate: { directory: 'articles/interview' } },
        { label: '方法实现', autogenerate: { directory: 'articles/handwriting-method' } },
        { label: '更多分享', autogenerate: { directory: 'articles/shared' } },
        { label: '工作问题记录', autogenerate: { directory: 'project-solution' } },
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
        // 订阅入口：浏览器/阅读器靠这行发现 feed
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'application/rss+xml',
            title: 'Joey 的前端笔记',
            href: '/rss.xml',
          },
        },
        // 分享卡片：Starlight 只输出 og:title/description 等，图片得自己补
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://joeybin.cn/og-cover.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://joeybin.cn/og-cover.png' } },
      ],
      // 重写组件
      components: {
        SocialIcons: './src/components/NavBar/index.astro',
        Footer: './src/components/Footer/index.astro',
        // 原生 select 的下拉弹层由系统绘制，焦点框改不动，换成自绘的三段式开关
        ThemeSelect: './src/components/ThemeSwitch/index.astro',
        // 文章标题下补「字数 · 阅读时长」，从 Markdown 原文现算
        PageTitle: './src/components/PageTitle/index.astro',
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
    mdx(),
    sitemap(),
  ],
});