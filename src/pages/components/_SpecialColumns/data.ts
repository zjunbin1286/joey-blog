
interface ListItem {
  title: string;
  url: string;
  description: string;
}

export const listData: ListItem[] = [
  {
    title: 'Vue.js',
    url: '/articles/vue',
    description: '渐进式 JavaScript 框架，易学易用，性能出色，适用场景丰富的 Web 前端框架。'
  },
  {
    title: 'React.js',
    url: '/articles/react',
    description: 'React 用于构建用户界面的 JavaScript 库'
  },
  {
    title: 'JavaScript',
    url: '/articles/javascript',
    description: '深入学习JavaScript，并试图手写实现一些方法...'
  },
  {
    title: 'HTML5+CSS3',
    url: '/articles/html5-css3',
    description: 'HTML5+CSS3'
  },
]
