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