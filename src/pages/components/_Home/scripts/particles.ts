/**
 * 首页首屏的星空粒子：鼠标引力 + 邻近连线。
 *
 * 拆出独立模块，是为了让 index.astro 只剩结构；
 * 逻辑与原来内联版本完全一致，只是把顶层变量收进函数作用域。
 */
export function mountParticles() {
  const root = document.getElementById('home-root')
  const canvas = document.getElementById('home-stars') as HTMLCanvasElement | null
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!root || !canvas) return

  const ctx = canvas.getContext('2d')
  let width = 0
  let height = 0
  /* core / spin 让每颗粒子的收束半径和盘旋速度略有差别，
     否则所有粒子会停在同一个圆上，看起来像画了个圈。
     hx / hy 是出生点：鼠标离开后粒子按这个坐标慢慢缓回去。 */
  let points: {
    x: number
    y: number
    hx: number
    hy: number
    vx: number
    vy: number
    r: number
    core: number
    spin: number
  }[] = []
  const mouse = { x: -9999, y: -9999 }
  let raf = 0
  /* 0 = 光标在画面里，纯吸引；1 = 光标走了，完全放开。
     用指数趋近而不是直接切换，否则离开瞬间粒子会"啪"地弹回去。 */
  let release = 0
  const RELEASE_EASE = 0.02
  const HOME_EASE = 0.012

  const starRGB = () =>
    getComputedStyle(document.documentElement).getPropertyValue('--home-star').trim() || '139 139 255'

  /* 鼠标引力参数：
     PULL_R 是引力半径，越远拉力越弱；CORE_R 以内改成斥力，
     让粒子在光标周围停成一圈光晕，而不是全部坍缩到一个点。 */
  const PULL_R = 260
  const CORE_R = 40
  const PULL = 0.05
  const PUSH = 0.05
  const SWIRL = 0.6
  const MAX_SPEED = 1.4

  // 主题切换时刷新一次即可，不必每帧都读计算样式
  let rgb = starRGB()
  new MutationObserver(() => {
    rgb = starRGB()
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  const build = () => {
    const count = Math.min(110, Math.max(30, Math.round(width / 13)))
    points = Array.from({ length: count }, () => {
      const x = Math.random() * width
      const y = Math.random() * height
      return {
        x,
        y,
        hx: x,
        hy: y,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.7,
        core: 0.55 + Math.random() * 0.6,
        spin: 0.35 + Math.random() * 0.55,
      }
    })
  }

  const resize = () => {
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = root.clientWidth
    height = Math.min(root.clientHeight, 900)
    canvas.style.height = `${height}px`
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    build()
    if (reduceMotion) draw(true)
  }

  const draw = (once = false) => {
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    if (!once) {
      // 光标在画面里 release 落回 0（重新吸引），离开则慢慢升到 1（开始散开）
      release += ((mouse.x < -9000 ? 1 : 0) - release) * RELEASE_EASE
    }

    for (const p of points) {
      if (!once) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)

        if (dist < PULL_R && dist > 0.001) {
          const nx = dx / dist
          const ny = dy / dist

          if (dist > CORE_R) {
            // 引力：线性弹簧，离得越远拉力越大，到 PULL_R 处衰减为 0
            const f = PULL * (dist / PULL_R)
            p.vx += nx * f
            p.vy += ny * f
            // 切向分量，让粒子绕光标盘旋而不是直冲
            p.vx += -ny * f * SWIRL * p.spin * 2
            p.vy += nx * f * SWIRL * p.spin * 2
          } else {
            // 核心斥力：太近了往回推，形成稳定的光环
            const core = CORE_R * p.core
            const f = PUSH * (1 - dist / core)
            p.vx -= nx * f
            p.vy -= ny * f
          }
        }

        p.vx *= 0.985
        p.vy *= 0.985

        // 引力会持续加速，限速避免粒子被甩出画面
        const speed = Math.hypot(p.vx, p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }

        p.x += p.vx
        p.y += p.vy

        /* 光标走了以后，位置向出生点做指数缓动。
           不用弹簧力，省得过冲、来回荡；三秒左右散回原来的分布，
           同时把残余速度抹掉，粒子不会带着惯性飘走。 */
        if (release > 0.002) {
          const k = HOME_EASE * release
          p.x += (p.hx - p.x) * k
          p.y += (p.hy - p.y) * k
          const drag = 1 - 0.06 * release
          p.vx *= drag
          p.vy *= drag
        }

        if (p.vx * p.vx + p.vy * p.vy < 0.004) {
          p.vx += (Math.random() - 0.5) * 0.05
          p.vy += (Math.random() - 0.5) * 0.05
        }
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${rgb} / 0.62)`
      ctx.fill()
    }

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i]
        const b = points[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d2 = dx * dx + dy * dy
        if (d2 < 16900) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgb(${rgb} / ${(0.3 * (1 - Math.sqrt(d2) / 130)).toFixed(3)})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }
    }

    if (!once) raf = requestAnimationFrame(() => draw())
  }

  resize()

  if (reduceMotion) {
    draw(true)
  } else {
    cancelAnimationFrame(raf)
    draw()

    // 页面不可见时暂停，省电
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        draw()
      }
    })

    window.addEventListener(
      'mousemove',
      (event) => {
        const rect = canvas.getBoundingClientRect()
        /* 滚到下面的区块时，光标还在 window 里、却已经不在星图上了，
           这种情况同样按"离开"处理，否则粒子会一直赖在边缘不下来。 */
        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        mouse.x = inside ? event.clientX - rect.left : -9999
        mouse.y = inside ? event.clientY - rect.top : -9999
      },
      { passive: true }
    )
    /* mouseleave 不冒泡，挂在 window 上根本收不到 —— 之前光标移出窗口后
       坐标停在最后一帧，粒子就一直聚在那儿不散。挂 document 才有效。
       mouseout 里 relatedTarget 为空能兜住「切到别的窗口」这种不触发 leave 的情况。 */
    const resetMouse = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    document.addEventListener('mouseleave', resetMouse)
    document.addEventListener('mouseout', (event) => {
      if (!event.relatedTarget) resetMouse()
    })
    window.addEventListener('blur', resetMouse)
  }

  let resizeTimer = 0
  window.addEventListener(
    'resize',
    () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 160)
    },
    { passive: true }
  )
}
