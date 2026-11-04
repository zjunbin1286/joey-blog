/**
 * 智慧星图：8 个专栏 = 8 个星座，一篇文章 = 一颗星
 *
 * 星点位置不是随手摆的：每颗星带真实赤经（ra，单位小时）与赤纬（dec，单位度），
 * 按「赤经向东递减」的星图惯例投影到平面上，再用 cos(dec) 修正高纬度处的经度收缩，
 * 这样星座形状和真实天空一致（北斗的斗柄、猎户的腰带才对得上）。
 * 星等（mag）决定点的大小与亮度，数值越小越亮。
 *
 * 全站只在这里改数据：新增文章不用动这里，页面会自动把多出来的文章挂成「伴星」。
 */

export interface StarDef {
  cn: string
  en: string
  ra: number
  dec: number
  mag: number
}

export interface ConstellationDef {
  /** 专栏目录名，同时决定文章 url 前缀 */
  key: string
  /** 专栏标题，和 _SpecialColumns/data.ts 保持一致 */
  column: string
  /** 星座中文名 */
  cn: string
  /** 星座拉丁名 */
  latin: string
  /** 一句话说明，聚焦时显示 */
  desc: string
  /** 在世界坐标里的中心 */
  cx: number
  cy: number
  stars: StarDef[]
  /** 星座连线，下标对应 stars */
  links: [number, number][]
}

/** 星座在世界坐标里的半径（世界单位） */
export const RADIUS = 158

/** 世界画布尺寸。左上角 760×420 故意留空，给标题让位。 */
export const WORLD = { w: 2400, h: 1360 }

export const definitions: ConstellationDef[] = [
  {
    key: 'html5-css3',
    column: 'HTML5&CSS3',
    cn: '北斗七星',
    latin: 'Ursa Major',
    desc: '最古老的一张指路图。布局、文档流、渲染时机，都是从这里找方向的。',
    cx: 1290,
    cy: 1060,
    stars: [
      { cn: '天枢', en: 'Dubhe', ra: 11.062, dec: 61.751, mag: 1.79 },
      { cn: '天璇', en: 'Merak', ra: 11.031, dec: 56.382, mag: 2.37 },
      { cn: '天玑', en: 'Phecda', ra: 11.897, dec: 53.695, mag: 2.44 },
      { cn: '天权', en: 'Megrez', ra: 12.257, dec: 57.033, mag: 3.31 },
      { cn: '玉衡', en: 'Alioth', ra: 12.9, dec: 55.96, mag: 1.77 },
      { cn: '开阳', en: 'Mizar', ra: 13.399, dec: 54.925, mag: 2.23 },
      { cn: '摇光', en: 'Alkaid', ra: 13.792, dec: 49.313, mag: 1.86 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  {
    key: 'javascript',
    column: 'JavaScript',
    cn: '猎户座',
    latin: 'Orion',
    desc: '冬天最好认的一团星。星最多、最亮，也最容易被误以为全都懂了。',
    cx: 1180,
    cy: 300,
    stars: [
      { cn: '参宿四', en: 'Betelgeuse', ra: 5.919, dec: 7.407, mag: 0.42 },
      { cn: '参宿五', en: 'Bellatrix', ra: 5.418, dec: 6.35, mag: 1.64 },
      { cn: '参宿三', en: 'Mintaka', ra: 5.533, dec: -0.299, mag: 2.25 },
      { cn: '参宿二', en: 'Alnilam', ra: 5.604, dec: -1.202, mag: 1.69 },
      { cn: '参宿一', en: 'Alnitak', ra: 5.679, dec: -1.943, mag: 1.74 },
      { cn: '参宿六', en: 'Saiph', ra: 5.796, dec: -9.67, mag: 2.07 },
      { cn: '参宿七', en: 'Rigel', ra: 5.242, dec: -8.202, mag: 0.13 },
      { cn: '觜宿一', en: 'Meissa', ra: 5.585, dec: 9.934, mag: 3.39 },
    ],
    links: [
      [0, 1],
      [0, 4],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [2, 6],
      [6, 5],
      [7, 0],
      [7, 1],
    ],
  },
  {
    key: 'vue',
    column: 'Vue.js',
    cn: '天鹅座',
    latin: 'Cygnus',
    desc: '一只沿银河飞行的十字。响应式像翅膀，看起来轻，实际撑起整片天。',
    cx: 1760,
    cy: 380,
    stars: [
      { cn: '天津四', en: 'Deneb', ra: 20.69, dec: 45.28, mag: 1.25 },
      { cn: '天津一', en: 'Sadr', ra: 20.37, dec: 40.257, mag: 2.23 },
      { cn: '辇道增七', en: 'Albireo', ra: 19.512, dec: 27.96, mag: 3.05 },
      { cn: '天津九', en: 'Gienah', ra: 20.77, dec: 33.97, mag: 2.48 },
      { cn: '天津二', en: 'Delta Cygni', ra: 19.75, dec: 45.131, mag: 2.87 },
      { cn: '天津八', en: 'Zeta Cygni', ra: 21.215, dec: 30.227, mag: 3.21 },
      { cn: '天津六', en: 'Iota Cygni', ra: 19.496, dec: 51.73, mag: 3.79 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [4, 1],
      [1, 3],
      [3, 5],
      [6, 0],
    ],
  },
  {
    key: 'node',
    column: 'Node.js',
    cn: '天蝎座',
    latin: 'Scorpius',
    desc: '一条长长的钩子。心宿二在最亮处，剩下的都在暗处排队。',
    cx: 2070,
    cy: 740,
    stars: [
      { cn: '心宿二', en: 'Antares', ra: 16.49, dec: -26.432, mag: 1.06 },
      { cn: '房宿四', en: 'Acrab', ra: 16.09, dec: -19.805, mag: 2.62 },
      { cn: '房宿三', en: 'Dschubba', ra: 16.005, dec: -22.622, mag: 2.29 },
      { cn: '尾宿一', en: 'Tau Scorpii', ra: 16.598, dec: -28.216, mag: 2.82 },
      { cn: '尾宿二', en: 'Epsilon Scorpii', ra: 16.836, dec: -34.293, mag: 2.29 },
      { cn: '尾宿三', en: 'Mu Scorpii', ra: 16.864, dec: -38.047, mag: 3.0 },
      { cn: '尾宿四', en: 'Eta Scorpii', ra: 17.203, dec: -43.239, mag: 3.32 },
      { cn: '尾宿五', en: 'Sargas', ra: 17.622, dec: -42.998, mag: 1.86 },
      { cn: '尾宿八', en: 'Shaula', ra: 17.56, dec: -37.104, mag: 1.62 },
      { cn: '尾宿九', en: 'Lesath', ra: 17.512, dec: -37.296, mag: 2.7 },
    ],
    links: [
      [1, 2],
      [2, 0],
      [0, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
    ],
  },
  {
    key: 'interview',
    column: '面试',
    cn: '仙后座',
    latin: 'Cassiopeia',
    desc: '一个 W。五个点连起来像一串追问，答案往往在两点之间。',
    cx: 1830,
    cy: 1100,
    stars: [
      { cn: '王良一', en: 'Caph', ra: 0.153, dec: 59.15, mag: 2.28 },
      { cn: '王良四', en: 'Schedar', ra: 0.675, dec: 56.537, mag: 2.24 },
      { cn: '策', en: 'Gamma Cassiopeiae', ra: 0.945, dec: 60.717, mag: 2.47 },
      { cn: '阁道三', en: 'Ruchbah', ra: 1.43, dec: 60.235, mag: 2.68 },
      { cn: '阁道二', en: 'Segin', ra: 1.906, dec: 63.67, mag: 3.35 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    key: 'handwriting-method',
    column: '手写方法',
    cn: '天琴座',
    latin: 'Lyra',
    desc: '织女星很亮，旁边几颗要暗下来才看得见。手写也一样，靠细节撑住。',
    cx: 820,
    cy: 1090,
    stars: [
      { cn: '织女一', en: 'Vega', ra: 18.615, dec: 38.784, mag: 0.03 },
      { cn: '渐台二', en: 'Sheliak', ra: 18.834, dec: 33.363, mag: 3.52 },
      { cn: '渐台三', en: 'Sulafat', ra: 18.982, dec: 32.69, mag: 3.25 },
      { cn: '天津增九', en: 'Delta Lyrae', ra: 18.908, dec: 36.899, mag: 4.3 },
      { cn: '织女二', en: 'Zeta Lyrae', ra: 18.746, dec: 37.605, mag: 4.36 },
    ],
    links: [
      [0, 4],
      [4, 3],
      [3, 2],
      [2, 1],
      [1, 4],
    ],
  },
  {
    key: 'react',
    column: 'React.js',
    cn: '双子座',
    latin: 'Gemini',
    desc: '两颗一样亮的主星。状态与视图，谁也离不开谁。',
    cx: 470,
    cy: 720,
    stars: [
      { cn: '北河二', en: 'Castor', ra: 7.577, dec: 31.888, mag: 1.58 },
      { cn: '北河三', en: 'Pollux', ra: 7.755, dec: 28.026, mag: 1.14 },
      { cn: '井宿三', en: 'Alhena', ra: 6.629, dec: 16.399, mag: 1.9 },
      { cn: '井宿四', en: 'Wasat', ra: 7.335, dec: 21.982, mag: 3.53 },
      { cn: '井宿五', en: 'Mebsuta', ra: 6.732, dec: 25.131, mag: 3.06 },
      { cn: '井宿一', en: 'Tejat', ra: 6.383, dec: 22.514, mag: 2.87 },
    ],
    links: [
      [0, 1],
      [0, 4],
      [4, 5],
      [5, 3],
      [3, 2],
      [1, 3],
    ],
  },
  {
    key: 'shared',
    column: '分享',
    cn: '昴星团',
    latin: 'Pleiades',
    desc: '一小簇零散的星，还没长成形状。这里也是，随手记下的东西先堆着。',
    cx: 1000,
    cy: 700,
    stars: [
      { cn: '昴宿六', en: 'Alcyone', ra: 3.792, dec: 24.105, mag: 2.87 },
      { cn: '昴宿七', en: 'Atlas', ra: 3.819, dec: 24.053, mag: 3.63 },
      { cn: '昴宿一', en: 'Electra', ra: 3.748, dec: 24.113, mag: 3.7 },
      { cn: '昴宿四', en: 'Maia', ra: 3.763, dec: 24.368, mag: 3.87 },
      { cn: '昴宿五', en: 'Merope', ra: 3.772, dec: 23.948, mag: 4.18 },
    ],
    links: [
      [0, 1],
      [0, 2],
      [0, 3],
      [3, 4],
    ],
  },
]

export interface ProjectedStar extends StarDef {
  x: number
  y: number
  /** 0~1，越大越亮，用来算半径和透明度 */
  lum: number
}

export interface PlacedConstellation extends ConstellationDef {
  cx: number
  cy: number
  pts: ProjectedStar[]
}

/** 赤经赤纬 → 平面坐标。y 轴翻转，让赤纬高的星画在上面。 */
function project(stars: StarDef[]): ProjectedStar[] {
  const meanDec = stars.reduce((sum, s) => sum + s.dec, 0) / stars.length
  const k = Math.cos((meanDec * Math.PI) / 180)
  const raw = stars.map((s) => ({ x: -s.ra * 15 * k, y: s.dec }))
  const mx = raw.reduce((sum, p) => sum + p.x, 0) / raw.length
  const my = raw.reduce((sum, p) => sum + p.y, 0) / raw.length
  const maxR = Math.max(...raw.map((p) => Math.hypot(p.x - mx, p.y - my))) || 1

  return stars.map((s, i) => ({
    ...s,
    x: ((raw[i].x - mx) / maxR) * RADIUS,
    y: (-(raw[i].y - my) / maxR) * RADIUS,
    // 星等 0.1~4.5 映射到 1~0
    lum: Math.max(0, Math.min(1, (4.6 - s.mag) / 4.5)),
  }))
}

/** 从正上方开始顺时针摆一圈 */
export const constellations: PlacedConstellation[] = definitions.map((def) => ({
  ...def,
  pts: project(def.stars),
}))
