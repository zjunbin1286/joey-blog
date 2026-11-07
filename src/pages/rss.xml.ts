import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import articleDates from '../data/article-dates.json';

/**
 * RSS 2.0 订阅源：/rss.xml
 *
 * 只收 articles/ 下的正文，各专栏的 index.mdx 是落地页，不算文章。
 * 发布时间取 article-dates.json（由 npm run gen:dates 从 git 首次提交生成），
 * 和首页排序用的是同一份数据，不会出现 feed 顺序和站点顺序不一致。
 */
export async function GET(context: APIContext) {
  const dates = articleDates as Record<string, string>;

  const entries = await getCollection(
    'docs',
    ({ id }) => id.startsWith('articles/') && !/(^|\/)index\.mdx?$/.test(id)
  );

  const items = entries.map((entry) => {
    // legacy collection 的 id 带扩展名，content layer 的不带，两种都兜住
    const slug = entry.id.replace(/\.mdx?$/, '');
    const date = dates[slug];

    return {
      title: entry.data.title,
      description: entry.data.description ?? '',
      link: `/${slug}/`,
      // 用当天早上八点，避免不同时区的阅读器显示成前一天
      pubDate: date ? new Date(`${date}T08:00:00+08:00`) : undefined,
    };
  });

  items.sort((a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0));

  return rss({
    title: 'Joey 的前端笔记',
    description: 'JavaScript、Vue、React、Node 与工程实践的文章更新。',
    site: context.site ?? 'https://zhujunbin.cloud',
    items,
    customData: '<language>zh-cn</language>',
  });
}
