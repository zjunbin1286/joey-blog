export interface ProjectItem {
  /** 列表里的主标题 */
  title: string;
  /** 标题右侧的补充说明，没有就不显示 */
  note?: string;
  url: string;
  /** 归属：线上产品 or 开源仓库，渲染成第一枚标签 */
  kind: '产品' | '开源';
  /** 一句到两句说清它是什么，列表里最多显示两行 */
  description: string;
  /** 技术栈 / 能力标签 */
  tags: string[];
  /** 左侧标记，两字符缩写 */
  mark: string;
}

export const listData: ProjectItem[] = [
  {
    title: 'Novapix AI',
    note: 'AI 智能图片设计平台',
    url: 'https://novapix-ai.online/dashboard',
    kind: '产品',
    description:
      '集 AI 生成、智能编辑、极速创作与资源管理于一体的图片设计平台，让设计师和内容创作者更快完成视觉创意。',
    tags: ['AI 生成', '智能编辑', '资源管理'],
    mark: 'NV',
  },
  {
    title: 'Docs Unity',
    note: '在线多人协同文档',
    url: 'https://docs-unity.icu/',
    kind: '产品',
    description:
      '支持表格、字体、图片等完整编辑能力，可导出 JSON / PDF / HTML / Text；具备组织账户、邀请系统、文档讨论与 @ 通知，以及实时同步编辑和用户管理。',
    tags: ['Next.js', 'React', 'Tiptap', 'Convex', 'LiveBlocks', 'Clerk'],
    mark: 'DU',
  },
  {
    title: 'npm-registry-nrs',
    note: 'npm 源管理器',
    url: '/collections/npm-registry-nrs',
    kind: '开源',
    description: '快速切换 npm 源，并对镜像源做增删改查的源管理工具。',
    tags: ['npm 源切换', '镜像管理'],
    mark: 'NR',
  },
  {
    title: 'easypress',
    note: 'SSG 静态站点生成框架',
    url: 'https://github.com/zjunbin1286/easypress',
    kind: '开源',
    description: '基于 Vite 的静态站点生成框架，面向现代 Web。',
    tags: ['Vite', 'SSG'],
    mark: 'EP',
  },
  {
    title: 'react-router-keepalive',
    note: '路由缓存组件',
    url: 'https://github.com/zjunbin1286/react-router-keepalive',
    kind: '开源',
    description: '基于 React Router 实现的 KeepAlive 缓存组件。',
    tags: ['React Router', 'KeepAlive'],
    mark: 'RK',
  },
  {
    title: 'react-playground',
    note: '代码演练场',
    url: 'https://github.com/zjunbin1286/react-playground',
    kind: '开源',
    description: '适用于 React 的 Playground 代码演练场。',
    tags: ['React', 'Playground'],
    mark: 'RP',
  },
  {
    title: 'react-lowcode-editor',
    note: '低代码编辑器',
    url: 'https://github.com/zjunbin1286/react-lowcode-editor',
    kind: '开源',
    description: '基于 React 实现的低代码编辑器。',
    tags: ['React', '低代码'],
    mark: 'LC',
  },
  {
    title: 'react-ui-design',
    note: 'React 组件库',
    url: 'https://github.com/zjunbin1286/react-ui-design',
    kind: '开源',
    description: '适用于 React 的简洁优雅的组件库。',
    tags: ['React', '组件库'],
    mark: 'UI',
  },
];
