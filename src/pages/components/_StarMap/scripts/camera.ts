/**
 * 观星台的相机：一个 SVG viewBox 的插值动画。
 *
 * fit()      初始铺满（按星点包围盒 + 左侧索引栏让位）
 * focusOn()  聚焦单个星座
 * flyTo()    rAF + easeInOutCubic 在两套 viewBox 之间插值
 * 另外管拖拽平移、滚轮缩放、Esc 返回、窗口 resize 重算。
 */
export function mountCamera() {
  const root = document.getElementById('starmap')
  const svg = document.getElementById('starmap-sky') as unknown as SVGSVGElement | null
  const labels = document.getElementById('starmap-labels')
  const world = document.getElementById('starmap-world')
  const resetBtn = document.querySelector('[data-reset]') as HTMLButtonElement | null
  const railEl = document.querySelector('[data-rail]') as HTMLElement | null
  const sideEl = document.querySelector('[data-side]') as HTMLElement | null
  const headEl = document.querySelector('[data-head]') as HTMLElement | null

  if (!root || !svg || !labels || !world) return

  const W = Number.parseFloat(svg.getAttribute('viewBox')!.split(/\s+/)[2])
  const H = Number.parseFloat(svg.getAttribute('viewBox')!.split(/\s+/)[3])

  type View = { x: number; y: number; w: number; h: number }

  let view: View = { x: 0, y: 0, w: W, h: H }
  let raf = 0
  let activeKey: string | null = null

  const viewport = () => {
    const rect = svg.getBoundingClientRect()
    return { w: rect.width || 1, h: rect.height || 1 }
  }

  /** 当前缩放比例（1 世界单位 = 多少屏幕像素） */
  const scaleOf = (v: View) => Math.min(viewport().w / v.w, viewport().h / v.h)

  const apply = () => {
    svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`)
    // 星座名与星名保持恒定屏幕字号，不然聚焦后会变成巨字
    const s = scaleOf(view) || 1
    labels.setAttribute('font-size', (14.5 / s).toFixed(2))
  }

  /** 星点实际占的范围（世界坐标），四周给星座名留出余量。只算一次 */
  let boxCache: { x: number; y: number; w: number; h: number } | null = null
  const skyBox = () => {
    if (boxCache) return boxCache
    let b = { x: 0, y: 0, width: W, height: H }
    try {
      const raw = (world as unknown as SVGGElement).getBBox()
      if (raw.width > 0 && raw.height > 0) b = raw
    } catch {
      // 拿不到就退回整块画布
    }
    const m = 62
    boxCache = { x: b.x - m, y: b.y - m, w: b.width + m * 2, h: b.height + m * 2 }
    return boxCache
  }

  /** 初始视角：桌面把星图铺在索引栏右边；竖屏按高度铺满，靠左右拖动浏览 */
  const fit = (): View => {
    const { w: vw, h: vh } = viewport()
    if (vw < 720) {
      const w = H * (vw / vh)
      return { x: (W - w) / 2, y: 78, w, h: H }
    }
    // 按星点实际占的范围（不是整块世界画布）来适配，左边给索引栏让位，
    // 这样图形能顶满，又不会钻到文字底下
    const box = skyBox()
    const left = (railEl ? railEl.getBoundingClientRect().right : 0) + 24
    const pad = 18
    const availW = Math.max(320, vw - left - pad)
    const availH = Math.max(320, vh - pad * 2)
    const s = Math.min(availW / box.w, availH / box.h)
    return {
      x: box.x - (left + (availW - box.w * s) / 2) / s,
      y: box.y - (pad + (availH - box.h * s) / 2) / s,
      w: vw / s,
      h: vh / s,
    }
  }

  /** 星座聚焦时落在「左侧索引 — 右侧面板」这条中线上 */
  const lanes = () => {
    const { w: vw } = viewport()
    const left = railEl ? railEl.getBoundingClientRect().right + 26 : 0
    const right = vw <= 960 ? vw : vw - 376
    return { left, target: (left + right) / 2 }
  }

  /** 聚焦某个星座：让星座直径占满短边的 85%，并给两侧面板让出位置 */
  const focusOn = (cx: number, cy: number): View => {
    const { w: vw, h: vh } = viewport()
    const aspect = vw / vh
    const stack = vw <= 960
    const w = Math.max(300, Math.min(900, (360 * vw) / (Math.min(vw, vh) * 0.85)))
    const h = w / aspect
    const shiftX = ((vw / 2 - lanes().target) * w) / vw
    const shiftY = stack ? h * 0.2 : 0
    return { x: cx - w / 2 + shiftX, y: cy - h / 2 + shiftY, w, h }
  }

  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

  /** 聚焦时索引要顶上去，位移量 = 标题高度 + 两者间距 */
  const syncLift = () => {
    if (!sideEl || !headEl) return
    const gap = Number.parseFloat(getComputedStyle(sideEl).rowGap) || 0
    sideEl.style.setProperty('--rail-lift', `${headEl.getBoundingClientRect().height + gap}px`)
  }

  const flyTo = (target: View, duration = 720) => {
    cancelAnimationFrame(raf)
    const from = { ...view }
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const k = ease(t)
      view = {
        x: from.x + (target.x - from.x) * k,
        y: from.y + (target.y - from.y) * k,
        w: from.w + (target.w - from.w) * k,
        h: from.h + (target.h - from.h) * k,
      }
      apply()
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  }

  const setActive = (key: string | null) => {
    activeKey = key
    root.dataset.focus = key ? 'true' : 'false'
    if (resetBtn) resetBtn.hidden = !key

    world.querySelectorAll('g[data-key]').forEach((g) => {
      g.setAttribute('data-active', String(!key || g.getAttribute('data-key') === key))
    })
    document.querySelectorAll('g[data-label]').forEach((g) => {
      g.setAttribute('data-active', String(!key || g.getAttribute('data-label') === key))
    })
    document.querySelectorAll('[data-panel]').forEach((p) => {
      const el = p as HTMLElement
      el.hidden = !key || el.dataset.key !== key
    })
    document.querySelectorAll('[data-chip]').forEach((chip) => {
      chip.setAttribute('aria-current', key && chip.getAttribute('data-chip') === key ? 'true' : 'false')
    })
  }

  const spots = Array.from(world.querySelectorAll('g[data-key]')).map((g) => ({
    key: g.getAttribute('data-key')!,
    cx: Number(g.getAttribute('data-cx')),
    cy: Number(g.getAttribute('data-cy')),
  }))

  const focusKey = (key: string) => {
    const item = spots.find((c) => c.key === key)
    if (!item) return
    setActive(key)
    flyTo(focusOn(item.cx, item.cy))
  }

  const reset = () => {
    setActive(null)
    flyTo(fit())
  }

  // 芯片：默认是链接（无 JS 时直接进专栏），有 JS 时改成聚焦
  document.querySelectorAll('[data-chip]').forEach((chip) => {
    chip.addEventListener('click', (event) => {
      event.preventDefault()
      const key = chip.getAttribute('data-chip')!
      if (activeKey === key) reset()
      else focusKey(key)
    })
  })

  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => reset())
  })
  resetBtn?.addEventListener('click', () => reset())
  document.querySelector('[data-rail-back]')?.addEventListener('click', () => reset())

  // 点击星座名也能聚焦
  document.querySelectorAll('g[data-label]').forEach((g) => {
    const el = g as SVGElement
    el.addEventListener('click', () => focusKey(el.getAttribute('data-label')!))
    el.style.cursor = 'pointer'
  })

  // 点星座本体（热区或任意星点）：
  // 当前不在这个星座里就飞进去；已经在这个星座里，就让星点链接照常跳文章。
  // 这样才能「总览 → 选星座 → 选文章」两级走，而不会一点星就离开星图。
  world.querySelectorAll('g[data-key]').forEach((g) => {
    const key = g.getAttribute('data-key')!
    g.addEventListener('click', (event) => {
      if (activeKey === key) return
      event.preventDefault()
      event.stopPropagation()
      focusKey(key)
    })
  })

  // 拖拽平移 + 滚轮缩放
  let dragging = false
  let moved = 0
  let lastX = 0
  let lastY = 0
  let dragId: number | null = null

  const toWorld = (clientX: number, clientY: number) => {
    const rect = svg.getBoundingClientRect()
    const s = scaleOf(view)
    const offsetX = rect.width - view.w * s
    const offsetY = rect.height - view.h * s
    return {
      x: view.x + (clientX - rect.left - offsetX / 2) / s,
      y: view.y + (clientY - rect.top - offsetY / 2) / s,
    }
  }

  svg.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return
    dragging = true
    dragId = event.pointerId
    moved = 0
    lastX = event.clientX
    lastY = event.clientY
    // 这里刻意不 setPointerCapture：一旦捕获，随后的 pointerup 和由它派生的 click
    // 都会被改派到 <svg> 自己身上，星座热区、星点、星座名就再也收不到点击了。
    // 等真的开始拖动（见 pointermove）再捕获。
  })

  svg.addEventListener('pointermove', (event) => {
    if (!dragging) return
    const dx = event.clientX - lastX
    const dy = event.clientY - lastY
    moved += Math.abs(dx) + Math.abs(dy)
    lastX = event.clientX
    lastY = event.clientY
    // 拖出去也别让指针丢了，松手前把捕获补上
    if (moved > 6 && dragId !== null && !svg.hasPointerCapture(dragId)) {
      svg.setPointerCapture(dragId)
    }
    const s = scaleOf(view)
    view = { ...view, x: view.x - dx / s, y: view.y - dy / s }
    apply()
  })

  const endDrag = () => {
    dragging = false
    if (dragId !== null && svg.hasPointerCapture(dragId)) svg.releasePointerCapture(dragId)
    dragId = null
  }

  svg.addEventListener('pointerup', endDrag)
  svg.addEventListener('pointercancel', endDrag)

  svg.addEventListener(
    'click',
    (event) => {
      if (moved > 6) {
        event.preventDefault()
        event.stopPropagation()
        moved = 0
      }
    },
    true
  )

  svg.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault()
      const before = toWorld(event.clientX, event.clientY)
      const factor = Math.exp(event.deltaY * 0.0014)
      const w = Math.min(W * 1.35, Math.max(280, view.w * factor))
      const h = w / (view.w / view.h)
      const s = Math.min(viewport().w / w, viewport().h / h)
      const rect = svg.getBoundingClientRect()
      const offsetX = rect.width - w * s
      const offsetY = rect.height - h * s
      view = {
        x: before.x - (event.clientX - rect.left - offsetX / 2) / s,
        y: before.y - (event.clientY - rect.top - offsetY / 2) / s,
        w,
        h,
      }
      apply()
    },
    { passive: false }
  )

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && activeKey) reset()
  })

  window.addEventListener('resize', () => {
    syncLift()
    if (!activeKey) view = fit()
    apply()
  })

  syncLift()
  view = fit()
  apply()
}
