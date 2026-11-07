/**
 * 从 Markdown 原文估算字数与阅读时长。
 *
 * 中文按字计，英文按词计；代码块、行内代码、HTML 标签和图片路径都不算正文，
 * 否则一篇带大段示例代码的笔记会被算成「要读半小时」。
 */
export interface ReadingStats {
  /** 正文字数（中文按字、英文按词） */
  words: number;
  /** 预计阅读分钟数，最少 1 */
  minutes: number;
}

export function readingStats(markdown: string): ReadingStats {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')      // 围栏代码块
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`[^`\n]*`/g, ' ')          // 行内代码
    .replace(/<[^>]+>/g, ' ')            // 内联 HTML
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // 图片
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接只留文字
    .replace(/https?:\/\/\S+/g, ' ');    // 裸链接

  const cjk = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latin = text.match(/[A-Za-z0-9][A-Za-z0-9'-]*/g)?.length ?? 0;

  const words = cjk + latin;
  // 中文约 350 字/分钟，英文约 180 词/分钟
  const minutes = Math.max(1, Math.round(cjk / 350 + latin / 180));

  return { words, minutes };
}
