interface ListItem {
  title: string;
  url: string;
  from: string;
  createDate: string;
}

export const listData: ListItem[] = [
  {
    url: 'https://mp.weixin.qq.com/s/x75dqt6FDHk5OEv13tr_tw',
    title: '前端定时任务的神库 Cron！，快把它加到你的项目中去！',
    createDate: '2024-03-30',
    from: '微信公众号'
  },
  {
    url: 'https://mp.weixin.qq.com/s/24RhBwvDyS4GVWhwWVHgkQ',
    title: '前端神库 Puppeteer ！让你能在 Nodejs 里操作浏览器玩出花样！',
    createDate: '2024-04-07',
    from: '微信公众号'
  },
]
