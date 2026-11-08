/**
 * 首页的入场动效：数字滚动、滚动淡入、卡片光斑跟随。
 * 三者共用同一套「元素进视口」判定，放在一个模块里。
 */
export function mountReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ── 数字滚动 ── */
  const counters = document.querySelectorAll<HTMLElement>('[data-count]')

  const countUp = (el: HTMLElement) => {
    if (el.dataset.done) return
    el.dataset.done = '1'
    const target = Number(el.dataset.count ?? el.textContent ?? 0)
    if (!Number.isFinite(target) || reduceMotion) {
      el.textContent = String(target)
      return
    }
    const duration = 1100
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.max(0, Math.min((now - start) / duration, 1))
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = String(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    el.textContent = '0'
    requestAnimationFrame(tick)
  }

  /* ── 滚动淡入 + 计数器触发 ──
     不用 IntersectionObserver：它依赖浏览器合成帧，无头渲染/部分场景下不回调。
     直接按 getBoundingClientRect 判定，行为更可预测。 */
  const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]')

  if (reduceMotion) {
    reveals.forEach((el) => el.setAttribute('data-in', ''))
    counters.forEach((el) => countUp(el))
  } else {
    let ticking = false

    const check = () => {
      ticking = false
      const limit = window.innerHeight * 0.92

      for (const el of reveals) {
        if (el.hasAttribute('data-in')) continue
        const top = el.getBoundingClientRect().top
        if (top < limit) el.setAttribute('data-in', '')
      }

      for (const el of counters) {
        if (el.dataset.done) continue
        const top = el.getBoundingClientRect().top
        if (top < limit) countUp(el)
      }
    }

    const requestCheck = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(check)
    }

    window.addEventListener('scroll', requestCheck, { passive: true })
    window.addEventListener('resize', requestCheck, { passive: true })
    // 首屏内容不依赖滚动，加载后立即判定一次
    requestAnimationFrame(check)
    window.setTimeout(check, 300)
  }

  /* ── 卡片光斑跟随鼠标 ── */
  document.querySelectorAll<HTMLElement>('[data-spot]').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      el.style.setProperty('--my', `${event.clientY - rect.top}px`)
    })
  })
}
