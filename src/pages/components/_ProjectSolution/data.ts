interface ListItem {
  title: string;
  url: string;
  createDate: string;
}

export const listData: ListItem[] = [
  {
    url: '/project-solution/01-resize-observer',
    title: '浏览器内置API，ResizeObserver 的使用，用于监听DOM元素尺寸的变化，可以在回调内处理对应逻辑',
    createDate: '2024-03-25',
  },
  {
    url: '/project-solution/02-depth-first-search-parent-children',
    title: '使用深度优先搜索查找父子级关联的数据',
    createDate: '2024-03-30',
  },
]
