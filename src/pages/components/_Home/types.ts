/** 首页各区块之间传递的视图数据：只保留模板要用的字段 */

export interface HomeArticle {
  title: string
  href: string
  /** YYYY-MM-DD，取 article-dates.json */
  date: string
  minutes: number
}

export interface HomeProject {
  title: string
  url: string
  external: boolean
  desc: string
}

export interface HomeStat {
  value: number
  suffix: string
  label: string
}

export interface HomeLink {
  label: string
  href: string
  count?: number
}

export interface HomeData {
  latest: HomeArticle[]
  projects: HomeProject[]
  stats: HomeStat[]
  extraLinks: HomeLink[]
  articleCount: number
  projectCount: number
  solutionCount: number
  /** 第几年：站点自 2021 年起算 */
  experience: number
  year: number
  /** 页脚「上次更新」，等于构建日期 */
  lastUpdated: string
}
