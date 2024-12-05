
interface ListItem {
  title: string;
  url: string;
  description: string;
  coverPath: string;
  createDate: string;
}

export const listData: ListItem[] = [
  {
    title: 'Vue.js',
    url: '/articles/vue',
    description: '渐进式 JavaScript 框架，易学易用，性能出色，适用场景丰富的 Web 前端框架。',
    coverPath: '/src/assets/collection/vue.jpg',
    createDate: '2024-12-05',
  },
  {
    title: 'React.js',
    url: '/articles/react',
    description: 'React 用于构建用户界面的 JavaScript 库',
    coverPath: '/src/assets/collection/react.jpg',
    createDate: '2024-12-05',
  },
  {
    title: 'JavaScript',
    url: '/articles/javascript',
    description: 'JS 是当前最流行、应用最广泛的客户端脚本语言，在 Web 开发领域有着举足轻重的地位，是成为一名优秀前端工程师的必备技能之一。',
    coverPath: '/src/assets/collection/javascript.png',
    createDate: '2024-12-05',
  },
  {
    title: 'HTML5&CSS3',
    url: '/articles/html5-css3',
    description: 'html5是html的最新标准版,css3是css的最新标准版。',
    coverPath: '/src/assets/collection/html-css.jpg',
    createDate: '2024-12-05',
  },
]
