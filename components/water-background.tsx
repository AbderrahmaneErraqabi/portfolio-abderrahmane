"use client"

import { useEffect, useRef } from "react"

export function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return
    const context = canvas.getContext("2d", { alpha: true })
    if (!context) return

    const width = 200
    const height = 120
    const size = width * height
    const current = new Float32Array(size)
    const next = new Float32Array(size)
    const image = context.createImageData(width, height)
    let frame = 0
    let active = false
    let previousX = -1
    let previousY = -1
    let pointerInside = false

    canvas.width = width
    canvas.height = height
    const inject = (x: number, y: number, amount: number) => {
      const radius = 4
      const left = Math.max(1, Math.floor(x) - radius)
      const right = Math.min(width - 2, Math.floor(x) + radius)
      const top = Math.max(1, Math.floor(y) - radius)
      const bottom = Math.min(height - 2, Math.floor(y) + radius)
      for (let row = top; row <= bottom; row += 1) {
        for (let column = left; column <= right; column += 1) {
          const dx = column - x
          const dy = row - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance <= radius) current[row * width + column] += amount * (1 - distance / radius)
        }
      }
      active = true
    }
    const draw = () => {
      frame = 0
      if (document.hidden) return
      let energy = 0
      for (let row = 1; row < height - 1; row += 1) {
        for (let column = 1; column < width - 1; column += 1) {
          const index = row * width + column
          const neighborAverage = (current[index - 1] + current[index + 1] + current[index - width] + current[index + width]) * .25
          const value = (neighborAverage - current[index]) * .22 + current[index] * .965
          next[index] = value
          energy += Math.abs(value)
        }
      }
      for (let row = 1; row < height - 1; row += 1) {
        for (let column = 1; column < width - 1; column += 1) {
          const index = row * width + column
          current[index] = next[index]
          const slope = current[index + 1] - current[index - 1] + current[index + width] - current[index - width]
          const light = Math.max(-1, Math.min(1, slope * 8))
          const pixel = index * 4
          image.data[pixel] = light > 0 ? 26 + light * 5 : 21
          image.data[pixel + 1] = light > 0 ? 19 + light * 4 : 17
          image.data[pixel + 2] = light > 0 ? 12 + light * 3 : 11
          image.data[pixel + 3] = Math.abs(light) * 42
        }
      }
      context.putImageData(image, 0, 0)
      if (energy > .08) frame = window.requestAnimationFrame(draw)
      else active = false
    }
    const schedule = () => {
      if (!frame && active && !document.hidden) frame = window.requestAnimationFrame(draw)
    }
    const move = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth * width
      const y = event.clientY / window.innerHeight * height
      if (previousX >= 0 && pointerInside) {
        const distance = Math.hypot(x - previousX, y - previousY)
        const steps = Math.min(10, Math.max(1, Math.ceil(distance / 2)))
        for (let step = 1; step <= steps; step += 1) {
          const progress = step / steps
          inject(previousX + (x - previousX) * progress, previousY + (y - previousY) * progress, .035)
        }
      } else {
        inject(x, y, .025)
      }
      previousX = x
      previousY = y
      pointerInside = true
      schedule()
    }
    const leave = () => {
      previousX = -1
      previousY = -1
      pointerInside = false
    }
    const visibility = () => {
      if (document.hidden) {
        frame = 0
        previousX = -1
        previousY = -1
      } else schedule()
    }
    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("pointerleave", leave, { passive: true })
    document.addEventListener("visibilitychange", visibility)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerleave", leave)
      document.removeEventListener("visibilitychange", visibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="water-background" aria-hidden="true" />
}
