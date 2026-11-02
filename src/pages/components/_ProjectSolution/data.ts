/** 问题记录的写作日期。
 *
 * 正文 frontmatter 里没有 date 字段（docsSchema 不认识，会被丢弃），
 * 所以按 slug 单独维护。列表的标题和摘要不在这里写，直接从 mdx 的
 * title / description 读，避免两处文案越改越不一致。 */
export const dates: Record<string, string> = {
  'project-solution/01-resize-observer': '2024-03-25',
  'project-solution/02-depth-first-search-parent-children': '2024-03-30',
  'project-solution/03-lodash-differencewith-ahooks_useprevious': '2024-04-01',
  'project-solution/04-canvas-handle-image-rotate': '2024-04-08',
  'project-solution/05-blob-type-json-to-blob-formdata': '2024-04-08',
  'project-solution/06-remote-image-link-to-buffer-blob': '2024-04-09',
  'project-solution/07-urlsearchparams-object-fromentries': '2024-04-22',
};
