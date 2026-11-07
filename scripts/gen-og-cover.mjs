/**
 * 生成分享卡片图 public/og-cover.png（1200×630）
 *
 * 用法：node scripts/gen-og-cover.mjs
 * 只在本地跑一次、产物直接进仓库，不参与构建 —— 免得 Vercel 上还要装字体。
 * 改配色时和 src/styles/custom.css 里的 --home-a1/a2/a3 对齐。
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const W = 1200;
const H = 630;

/** 固定种子的伪随机，保证每次生成的星点位置一致 */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = rng(20261107);
const stars = Array.from({ length: 110 }, () => {
  const x = (rand() * W).toFixed(1);
  const y = (rand() * H).toFixed(1);
  const r = (0.6 + rand() * 1.5).toFixed(2);
  const o = (0.15 + rand() * 0.55).toFixed(2);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${o}"/>`;
}).join('');

/**
 * 右侧一小片星座：首页那层 Canvas 粒子网络的静态版，
 * 节点 + 就近连线，把右半边的空白撑起来。
 */
const nodes = [
  [772, 168, 2.6], [905, 122, 1.8], [1040, 196, 3], [1142, 128, 1.6],
  [838, 268, 1.7], [972, 300, 2.4], [1108, 356, 1.5], [742, 372, 1.4],
  [886, 420, 2.2], [1024, 462, 1.7], [1136, 470, 2.1], [806, 508, 1.5],
];
const links = [
  [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [4, 7],
  [6, 8], [8, 9], [9, 10], [8, 11], [7, 11], [9, 5],
];
const constellation =
  links
    .map(([a, b]) => {
      const [x1, y1] = nodes[a];
      const [x2, y2] = nodes[b];
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="hsl(258 100% 82%)" stroke-opacity="0.18" stroke-width="1"/>`;
    })
    .join('') +
  nodes
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="hsl(258 100% 92%)" opacity="0.7"/>`)
    .join('');


const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c0a13"/>
      <stop offset="0.55" stop-color="#100d1b"/>
      <stop offset="1" stop-color="#161029"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.12" cy="0.05" r="0.75">
      <stop offset="0" stop-color="hsl(258 100% 72%)" stop-opacity="0.34"/>
      <stop offset="1" stop-color="hsl(258 100% 72%)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.92" cy="1.02" r="0.7">
      <stop offset="0" stop-color="hsl(330 100% 72%)" stop-opacity="0.26"/>
      <stop offset="1" stop-color="hsl(330 100% 72%)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowC" cx="0.78" cy="0.18" r="0.5">
      <stop offset="0" stop-color="hsl(190 100% 60%)" stop-opacity="0.18"/>
      <stop offset="1" stop-color="hsl(190 100% 60%)" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="star" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.5" stop-color="hsl(258 100% 84%)"/>
      <stop offset="1" stop-color="hsl(190 100% 76%)"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="hsl(258 100% 72%)" stop-opacity="0.75"/>
      <stop offset="0.6" stop-color="hsl(190 100% 60%)" stop-opacity="0.2"/>
      <stop offset="1" stop-color="hsl(190 100% 60%)" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(258 100% 72%)" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="hsl(330 100% 72%)" stop-opacity="0.18"/>
      <stop offset="1" stop-color="hsl(190 100% 60%)" stop-opacity="0.45"/>
    </linearGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>
  <rect width="${W}" height="${H}" fill="url(#glowC)"/>
  ${stars}
  <g>${constellation}</g>
  <rect x="0.75" y="0.75" width="${W - 1.5}" height="${H - 1.5}" fill="none" stroke="url(#edge)" stroke-width="1.5" rx="0"/>

  <!-- 四角星：和首页「前往观星台」按钮同一个图形，放大后带一层柔光 -->
  <g transform="translate(88 92) scale(3.4)">
    <path d="M8 1.4 9.5 6.5 14.6 8 9.5 9.5 8 14.6 6.5 9.5 1.4 8 6.5 6.5Z" fill="url(#star)" filter="url(#soft)" opacity="0.6"/>
    <path d="M8 1.4 9.5 6.5 14.6 8 9.5 9.5 8 14.6 6.5 9.5 1.4 8 6.5 6.5Z" fill="url(#star)"/>
  </g>

  <text x="86" y="330" font-family="Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif" font-size="104" font-weight="700" letter-spacing="-2" fill="#f6f4ff">Joey</text>
  <text x="88" y="400" font-family="Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif" font-size="34" fill="#aaa3c4">前端笔记 · JavaScript / Vue / React / Node</text>

  <rect x="88" y="452" width="560" height="1.5" fill="url(#rule)"/>

  <text x="88" y="512" font-family="Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif" font-size="26" fill="#7c7596">一行一行，把踩过的坑写成笔记</text>
  <text x="1112" y="512" text-anchor="end" font-family="Microsoft YaHei, PingFang SC, Noto Sans SC, sans-serif" font-size="26" fill="#7c7596">zhujunbin.cloud</text>
</svg>`;

const out = join(root, 'public/og-cover.png');
await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(out);
writeFileSync(join(root, '.workbuddy/tmp/og-cover.svg'), svg);
console.log('written', out);
