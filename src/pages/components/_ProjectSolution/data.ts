interface ListItem {
  title: string;
  url: string;
  createDate: string;
}

export const listData: ListItem[] = [
  {
    url: '/project-solution/05-blob-type-json-to-blob-formdata',
    title: '将 JSON 对象转换为 Blob，设置 Blob 数据的类型，再使用 FormData 数据格式请求接口',
    createDate: '2024-04-08',
  },
  {
    url: '/project-solution/04-canvas-handle-image-rotate',
    title: '创建离屏 Canvas 将图片进行旋转，并转为二进制流',
    createDate: '2024-04-08',
  },
  {
    url: '/project-solution/03-lodash-differencewith-ahooks_useprevious',
    title: 'lodash 中 differenceWith 以及 ahooks 中 usePrevious 的用法',
    createDate: '2024-04-01',
  },
  {
    url: '/project-solution/02-depth-first-search-parent-children',
    title: '使用深度优先搜索查找父子级关联的数据',
    createDate: '2024-03-30',
  },
  {
    url: '/project-solution/01-resize-observer',
    title: '浏览器内置API，ResizeObserver 的使用，用于监听DOM元素尺寸的变化，可以在回调内处理对应逻辑',
    createDate: '2024-03-25',
  },
]
