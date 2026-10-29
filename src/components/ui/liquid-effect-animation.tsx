"use client"

import { useEffect, useRef } from "react"
import LiquidBackground from 'threejs-components/build/backgrounds/liquid1.min.js'

export interface LiquidEffectAnimationProps {
  className?: string
  canvasClassName?: string
  id?: string
  imageSrc?: string
  rain?: boolean
  metalness?: number
  roughness?: number
  color?: string
}

export function LiquidEffectAnimation({
  className = "",
  canvasClassName = "",
  id = "liquid-canvas",
  imageSrc = "/bright-trees.jpg",
  rain = true,
  metalness = 0.02,
  roughness = 0.35,
  color = "#ffffff",
}: LiquidEffectAnimationProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<any>(null)

  useEffect(() => {
    let isCancelled = false
    const canvas = canvasRef.current
    if (!canvas) return

    // 1. Instant initialization: Set up LiquidBackground immediately on Frame 1
    let app: any = null
    try {
      app = LiquidBackground(canvas)
      appRef.current = app
      window.__liquidApp = app

      // Configure natural water physics: realistic refraction and zero metallic clouding
      if (app.liquidPlane?.material) {
        app.liquidPlane.material.metalness = metalness
        app.liquidPlane.material.roughness = roughness
        if (app.liquidPlane.material.color) {
          app.liquidPlane.material.color.set(color)
        }
      }
      // Gentle displacement scale: keeps background forest and sunlight perfectly visible & readable
      if (app.liquidPlane?.uniforms?.displacementScale) {
        app.liquidPlane.uniforms.displacementScale.value = 1.15
      }
      // Calm ripple dissipation so waves don't pile up into distortion
      if (app.liquidPlane) {
        app.liquidPlane.attenuation = 0.965
      }

      // Start gentle, soothing rain drops (every ~1.4 seconds)
      app.setRain(rain)
      if (rain && app.setRainTime) {
        app.setRainTime(1.4)
      }

      // 2. Fast non-blocking texture loading in background
      const activeSrc = imageSrc || "/bright-trees.jpg"
      app.loadImage(activeSrc).then(() => {
        if (isCancelled && app?.dispose) {
          app.dispose()
        }
      }).catch(() => {
        if (!isCancelled) {
          app.loadImage("/green-foliage.jpg").catch(() => {})
        }
      })
    } catch (err) {
      console.error("LiquidBackground init error:", err)
    }

    // 3. High-sensitivity mouse attraction & interactive ripple generator
    let lastX = 0
    let lastY = 0
    let lastTime = 0

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const now = performance.now()
      if (now - lastTime < 16) return // smooth ~60fps throttling
      lastTime = now

      // Convert screen client coordinates to Three.js normalized device coordinates (-1 to 1)
      const width = window.innerWidth || 1
      const height = window.innerHeight || 1
      const nx = (e.clientX / width) * 2 - 1
      const ny = -(e.clientY / height) * 2 + 1

      const dx = nx - lastX
      const dy = ny - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)

      lastX = nx
      lastY = ny

      // Trigger refined liquid ripple at exact mouse position: fluid yet crystal-clear
      if (appRef.current?.liquidPlane) {
        const radius = Math.min(0.045, 0.024 + dist * 0.07)
        const strength = Math.min(0.035, 0.012 + dist * 0.04)
        appRef.current.liquidPlane.addDrop(nx, ny, radius, strength)
      }
    }

    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      const width = window.innerWidth || 1
      const height = window.innerHeight || 1
      const nx = (e.clientX / width) * 2 - 1
      const ny = -(e.clientY / height) * 2 + 1

      if (appRef.current?.liquidPlane) {
        // Gentle splash on click or tap
        appRef.current.liquidPlane.addDrop(nx, ny, 0.055, 0.04)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })

    return () => {
      isCancelled = true
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      if (appRef.current && appRef.current.dispose) {
        appRef.current.dispose()
        appRef.current = null
      }
      if (window.__liquidApp && window.__liquidApp.dispose) {
        window.__liquidApp.dispose()
        window.__liquidApp = null
      }
    }
  }, [id, imageSrc, rain, metalness, roughness, color])

  return (
    <div
      className={`fixed inset-0 m-0 w-full h-full touch-none overflow-hidden ${className}`}
      style={{ fontFamily: '"Montserrat", serif' }}
    >
      {/* Underlying sharp background image: ensures the lush green sunlit trees and sky remain 100% visible and vivid */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10 pointer-events-none"
        style={{ 
          backgroundImage: `url(${imageSrc || '/bright-trees.jpg'})`,
          filter: 'brightness(1.05) contrast(1.02)'
        }}
      />
      <canvas
        ref={canvasRef}
        id={id}
        className={`fixed inset-0 w-full h-full block filter brightness-105 contrast-102 ${canvasClassName}`}
      />
      {/* Gentle sunlight atmosphere overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-emerald-950/10 pointer-events-none" />
    </div>
  )
}

declare global {
  interface Window {
    __liquidApp?: any
  }
}
