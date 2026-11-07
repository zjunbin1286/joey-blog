import type { APIRoute } from 'astro';

/**
 * 全站总访问量计数
 *
 * 数据存在 Upstash Redis（在 Vercel 后台 Storage 里建一个，变量会自动注入）。
 * 只存一个整数 + 短期去重指纹，不落原始 IP、不写 cookie。
 *
 * 没配置 Redis 时返回 503，前端拿到后隐藏数字，页面上不会留空壳。
 */

export const prerender = false;

const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '';
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? '';

const SITE_KEY = 'joey:site:pv';
/** 同一访客 30 分钟内只计一次，避免刷新即 +1 把数字刷虚 */
const SEEN_TTL = 60 * 30;

const reply = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // 计数接口不能被 CDN 缓存，否则永远是同一个数
      'cache-control': 'no-store, max-age=0',
    },
  });

async function redis(command: (string | number)[]) {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const data = (await res.json()) as { result?: unknown };
  return data.result;
}

/** 指纹只用于 30 分钟内去重，键里带日期，过期即删，不构成长期画像 */
async function fingerprint(request: Request, clientAddress?: string) {
  const ip =
    clientAddress ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';
  const ua = request.headers.get('user-agent') ?? '';
  const day = new Date().toISOString().slice(0, 10);
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${ip}|${ua}|${day}`)
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const GET: APIRoute = async ({ request, clientAddress }) => {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return reply({ views: null, configured: false }, 503);
  }

  try {
    const id = await fingerprint(request, clientAddress);
    // SET ... NX 返回 'OK' 说明这位访客 30 分钟内没来过，才真正 +1
    const first = await redis(['SET', `joey:pv:seen:${id}`, '1', 'NX', 'EX', SEEN_TTL]);
    const views =
      first === 'OK'
        ? Number(await redis(['INCR', SITE_KEY]))
        : Number((await redis(['GET', SITE_KEY])) ?? 0);

    return reply({ views: Number.isFinite(views) ? views : null, configured: true }, 200);
  } catch {
    // Redis 抽风时不影响页面：前端拿到非 200 就保持隐藏
    return reply({ views: null, configured: true }, 502);
  }
};
