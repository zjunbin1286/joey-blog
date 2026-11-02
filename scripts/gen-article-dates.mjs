/**
 * 从 git 历史中提取每篇文章的首次提交日期，输出 src/data/article-dates.json
 *
 * 用法：node scripts/gen-article-dates.mjs
 * 新增文章后重跑一次即可。日期取 author date，rebase 不会丢。
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = join(root, 'src/content/docs/articles');
const outFile = join(root, 'src/data/article-dates.json');

/** 递归收集 .md / .mdx 文件 */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.mdx?$/.test(name)) out.push(full);
  }
  return out;
}

/** 取文件最早一次被添加的提交日期（YYYY-MM-DD） */
function firstCommitDate(absPath) {
  const rel = relative(root, absPath).split('\\').join('/');
  try {
    const out = execFileSync(
      'git',
      ['log', '--diff-filter=A', '--format=%as', '--follow', '--', rel],
      { cwd: root, encoding: 'utf8' }
    ).trim();
    const dates = out.split('\n').filter(Boolean);
    return dates.length ? dates[dates.length - 1] : null;
  } catch {
    return null;
  }
}

const map = {};
for (const abs of walk(docsDir)) {
  const rel = relative(docsDir, abs).split('\\').join('/');
  // slug 形式：去掉扩展名，articles/ 前缀补上
  const slug = 'articles/' + rel.replace(/\.mdx?$/, '');
  const date = firstCommitDate(abs);
  if (date) map[slug] = date;
}

mkdirSync(dirname(outFile), { recursive: true });
const sorted = Object.fromEntries(
  Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
);
writeFileSync(outFile, JSON.stringify(sorted, null, 2) + '\n', 'utf8');

console.log(`已写入 ${Object.keys(sorted).length} 条日期记录 -> src/data/article-dates.json`);
