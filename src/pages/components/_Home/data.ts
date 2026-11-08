import { getCollection } from 'astro:content'
import articleDates from '../../../data/article-dates.json'
import { listData } from '../_Collections/data'
import type { HomeData, HomeProject } from './types'

/** 兼容 legacy collection 的 entry 形状（id 是否带扩展名各版本不一致） */
interface DocEntry {
  id: string
  slug?: string
  body?: string
  data: {
    title: string
    description?: string
    draft?: boolean
    sidebar?: { hidden?: boolean }
  }
}

const stripExt = (id: string) => id.replace(/\.mdx?$/, '')
const slugOf = (entry: DocEntry) => entry.slug ?? stripExt(entry.id)

/** 开源项目：去掉 description 开头的 emoji，截断过长描述。
    Novapix AI 在下方有独立专题区块，这里排除掉，避免同一屏出现两次。 */
const toProjects = (): HomeProject[] =>
  listData
    .filter((item) => !/novapix-ai\.online/i.test(item.url))
    .slice(0, 6)
    .map((item) => {
      const plain = item.description
        .replace(/^[\p{Extended_Pictographic}\uFE0F\s]+/u, '')
        .trim()
      return {
        title: item.title.replace(/（.*?）$/, ''),
        url: item.url,
        external: /^https?:\/\//.test(item.url),
        desc: plain.length > 72 ? `${plain.slice(0, 72).replace(/[\s,，。；;:：]$/, '')}…` : plain,
      }
    })

/**
 * 首页渲染需要的全部数据。
 *
 * 这些原本写在 index.astro 的 frontmatter 里，和 600 行模板混在一起，
 * 改个排序规则要翻半天。模板只剩结构之后，数据逻辑集中到这里。
 */
export async function loadHomeData(): Promise<HomeData> {
  const docs = ((await getCollection('docs')) as unknown as DocEntry[]).filter((entry) => {
    if (entry.data.draft) return false
    if (entry.data.sidebar?.hidden) return false
    return true
  })

  /** 技术笔记：articles/ 下的正文，排除各目录的 index 落地页 */
  const articles = docs
    .filter((entry) => {
      const slug = slugOf(entry)
      return slug.startsWith('articles/') && !/(^|\/)index$/.test(slug)
    })
    .map((entry) => {
      const slug = slugOf(entry)
      const text = (entry.body ?? '').replace(/\s+/g, '')
      return {
        title: entry.data.title,
        href: `/${slug}/`,
        date: (articleDates as Record<string, string>)[slug] ?? '',
        minutes: Math.max(1, Math.round(text.length / 350)),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  const solutions = docs.filter((entry) => {
    const slug = slugOf(entry)
    return slug.startsWith('project-solution/') && !slug.endsWith('example')
  })

  const projects = toProjects()

  /* 站点自报的日期一律按北京时间算：Vercel 构建机是 UTC，
     直接 new Date() 取年月日会差一天（凌晨构建会显示前一天） */
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(new Date())

  const year = Number(today.slice(0, 4))

  return {
    latest: articles.slice(0, 5),
    projects,
    stats: [
      { value: articles.length, suffix: '', label: '篇文章' },
      { value: listData.length, suffix: '', label: '个项目' },
      { value: solutions.length, suffix: '', label: '份问题记录' },
    ],
    extraLinks: [
      { label: '工作问题记录', href: '/project-solution', count: solutions.length },
      { label: '归档', href: '/timeline' },
      { label: '社区转发', href: '/community-article' },
      { label: '站点导航', href: '/site-navigation' },
      { label: '关于我', href: '/about-me' },
    ],
    articleCount: articles.length,
    projectCount: listData.length,
    solutionCount: solutions.length,
    experience: year - 2021,
    year,
    /* 页脚「上次更新」= 本次构建日期。这是静态站，每次提交都会重新构建并部署，
       所以它就等于站点最近一次真正更新的时间。
       早先这里取的是「最新一篇文章的日期」，文章停更后这个数字就永远停在 2025-03-22 了。 */
    lastUpdated: today,
  }
}
