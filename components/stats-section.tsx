"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 500, suffix: "+", label: "Produse Vândute", description: "Livrate cu succes în toată România" },
  { value: 100, suffix: "%", label: "Ingrediente Naturale", description: "Exclusiv ingrediente certificate" },
  { value: 50, suffix: "+", label: "Varietăți", description: "Gamă diversificată de cosmetice" },
  { value: 1000, suffix: "+", label: "Clienți Mulțumiți", description: "Comunitate în creștere" },
  { value: 98, suffix: "%", label: "Satisfacție", description: "Clienți care recomandă" },
  { value: 0, suffix: "", label: "Chimicale", description: "Zero substanțe nocive" },
]

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true
    const duration = 2000; const start = performance.now()
    function update(now: number) {
      const elapsed = now - start; const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * target))
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [isVisible, target])
  return <span className="font-[var(--font-bebas)] text-4xl md:text-6xl text-accent leading-none">{count}{suffix}</span>
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
      ScrollTrigger.create({ trigger: gridRef.current, start: "top 85%", onEnter: () => setIsVisible(true) })
      const items = gridRef.current?.querySelectorAll("article")
      if (items && items.length > 0) {
        gsap.set(items, { y: 30, opacity: 0 })
        gsap.to(items, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8">
      <div ref={headerRef} className="mb-10">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">06 / Impact</span>
        <h2 className="mt-2 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight text-white">IMPACTUL NOSTRU</h2>
        <p className="mt-2 max-w-md font-mono text-[9px] text-white/50 leading-relaxed">Cifrele vorbesc de la sine.</p>
      </div>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat, i) => (
          <article key={i} className="group bg-white/3 border border-white/8 p-5 transition-all duration-500 hover:border-accent/40">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
            <h3 className="mt-2 font-[var(--font-bebas)] text-base tracking-tight text-white group-hover:text-accent transition-colors duration-300">{stat.label}</h3>
            <p className="mt-1 font-mono text-[8px] text-white/40 leading-relaxed">{stat.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
