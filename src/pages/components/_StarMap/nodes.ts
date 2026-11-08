import { getCollection } from 'astro:content'
import { constellations, WORLD, RADIUS } from './data'

/** 兼容 legacy collection 的 entry 形状 */
interface DocEntry {
  id: string
  slug?: string
  data: { title: string; sidebar?: { hidden?: boolean } }
  body?: string
}

const docs = (await getCollection('docs')) as unknown as DocEntry[]
const slugOf = (entry: DocEntry) => entry.slug ?? entry.id.replace(/\.mdx?$/, '')

export const pad = (n: number) => String(n).padStart(2, '0')

/** 某专栏下的全部笔记，按文件序号排（01-、02- …） */
function articlesOf(key: string) {
  return docs
    .filter((entry) => {
      const slug = slugOf(entry)
      if (entry.data.sidebar?.hidden) return false
      if (/(^|\/)index$/.test(slug)) return false
      return slug.startsWith(`articles/${key}/`)
    })
    .sort((a, b) => slugOf(a).localeCompare(slugOf(b), 'en'))
    .map((entry) => ({ title: entry.data.title, url: `/${slugOf(entry)}/` }))
}

/** 背景散星：固定种子，保证每次构建一致，不会跳 */
let seed = 20261104
const rand = () => {
  seed = (seed * 16807) % 2147483647
  return seed / 2147483647
}
export const bgStars = Array.from({ length: 170 }, () => ({
  x: rand() * WORLD.w,
  y: rand() * WORLD.h,
  r: 0.9 + rand() * 1.7,
  o: 0.14 + rand() * 0.5,
}))

/** 确定性伪随机（同一个输入永远同一串数），用来给每颗星配闪烁节奏：
    构建一次就定死，刷新页面不会整片乱跳。 */
const hash = (a: number, b: number, c: number) => {
  const x = Math.sin(a * 12.9898 + b * 78.233 + c * 37.719) * 43758.5453
  return x - Math.floor(x)
}

/** 一颗星的闪烁参数：周期 3.4–7.4s、相位用负延迟错开、三套曲线轮着用 */
const twinkleOf = (ci: number, i: number, salt = 0) => ({
  variant: (ci * 2 + i + salt) % 3,
  dur: (3.4 + hash(ci, i + salt, 1) * 4).toFixed(2),
  delay: (-hash(ci, i + salt, 2) * 7.4).toFixed(2),
})

const raw = constellations.map((c, ci) => {
  const arts = articlesOf(c.key)

  const stars = c.pts.map((p, i) => {
    const len = Math.hypot(p.x, p.y) || 1
    const dx = p.x / len
    const dy = p.y / len
    const r = 4 + p.lum * 3.6
    return {
      ...p,
      r,
      absX: c.cx + p.x,
      absY: c.cy + p.y,
      art: arts[i] ?? null,
      tw: twinkleOf(ci, i),
      // 星名朝星座外侧散开，避免挤在中间
      labelX: c.cx + p.x + dx * (r + 26),
      labelY: c.cy + p.y + dy * (r + 30),
      anchor: dx > 0.35 ? 'start' : dx < -0.35 ? 'end' : 'middle',
    }
  })

  // 文章比主星多出来的，挂成伴星，围在星座外圈
  const companions = arts.slice(stars.length).map((art, i) => {
    const a = (((ci * 47 + i * 71) % 360) * Math.PI) / 180
    const rr = RADIUS * (1.16 + ((ci * 29 + i * 13) % 24) / 100)
    return {
      ...art,
      absX: c.cx + Math.cos(a) * rr,
      absY: c.cy + Math.sin(a) * rr,
      r: 3.4,
      tw: twinkleOf(ci, i, 5),
    }
  })

  // 点击热区的半径：贴着这一片星点画，别外扩太多。
  // 外扩过头会盖住邻居的星区，点在 A 的边缘反而跳去 B。
  const reach = Math.max(
    60,
    ...stars.map((s) => Math.hypot(s.x, s.y)),
    ...companions.map((s) => Math.hypot(s.absX - c.cx, s.absY - c.cy))
  )

  return { ...c, stars, companions, arts, index: ci, hitR: reach + 24 }
})

export const nodes = raw
export type SkyNode = (typeof raw)[number]
export type SkyStar = SkyNode['stars'][number]
export type SkyCompanion = SkyNode['companions'][number]
export type BgStar = (typeof bgStars)[number]

export const totalNotes = nodes.reduce((sum, n) => sum + n.arts.length, 0)
export const totalStars = nodes.reduce((sum, n) => sum + n.stars.length + n.companions.length, 0)
