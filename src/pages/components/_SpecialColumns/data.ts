import vueImg from '../../../assets/collection/vue.jpg'
import reactImg from '../../../assets/collection/react.jpg'
import javascriptImg from '../../../assets/collection/javascript.png'
import htmlCssImg from '../../../assets/collection/html-css.jpg'
import nodeImg from '../../../assets/collection/node.jpg'
import interviewImg from '../../../assets/collection/interview.jpg'

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
    url: '/articles/vue/01-built-in-irectives',
    description: '渐进式 JavaScript 框架，易学易用，性能出色，适用场景丰富的 Web 前端框架。',
    coverPath: vueImg.src,
    createDate: '2024-12-05',
  },
  {
    title: 'React.js',
    url: '/articles/react/01-quick-learn-react',
    description: 'React 用于构建用户界面的 JavaScript 库',
    coverPath: reactImg.src,
    createDate: '2024-12-05',
  },
  {
    title: 'JavaScript',
    url: '/articles/javascript/01-call',
    description: 'JS 是当前最流行、应用最广泛的客户端脚本语言，在 Web 开发领域有着举足轻重的地位，是成为一名优秀前端工程师的必备技能之一。',
    coverPath: javascriptImg.src,
    createDate: '2024-12-05',
  },
  {
    title: 'Node.js',
    url: '/articles/node/01-learn-fs-path',
    description: 'Node.js 是一个基于 Chrome V8 引擎 的 JavaScript 运行时环境。',
    coverPath: nodeImg.src,
    createDate: '2024-12-10',
  },
  {
    title: 'HTML5&CSS3',
    url: '/articles/html5-css3/01-life-cycle',
    description: 'html5是html的最新标准版,css3是css的最新标准版。',
    coverPath: htmlCssImg.src,
    createDate: '2024-12-05',
  },
  {
    title: '面试官系列',
    url: '/articles/interview',
    description: 'html5是html的最新标准版,css3是css的最新标准版。',
    coverPath: interviewImg.src,
    createDate: '2024-12-15',
  }
]
