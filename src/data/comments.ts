/**
 * 评论区（giscus）配置
 *
 * 开启步骤：
 * 1. 仓库要是 public，并在 Settings → General → Features 里勾上 Discussions
 * 2. 打开 https://github.com/apps/giscus 安装到该仓库
 * 3. 打开 https://giscus.app/zh-CN，填仓库名，选一个 Discussion 分类
 *    （建议新建一个 Announcements 类型的分类，比如「评论」），
 *    页面下方会给出 data-repo-id 和 data-category-id —— 抄到下面两行
 *
 * 两项都填了才会渲染，否则整块不输出，页面上不会留空白。
 */
export const giscus = {
  repo: 'zjunbin1286/joey-blog',
  repoId: 'R_kgDONX0HIw',
  /**
   * 用的仓库自带的 Announcements 分类：只有维护者能发起讨论、读者只能评论，
   * 正好符合「文章评论区」的语义，也不用额外建分类（GitHub 没开放建分类的 API）。
   */
  category: 'Announcements',
  categoryId: 'DIC_kwDONX0HI84DKme7',
  /** pathname：同一篇文章不同域名下也算同一个讨论串 */
  mapping: 'pathname',
} as const;

export const commentsEnabled = Boolean(giscus.repoId && giscus.categoryId);
