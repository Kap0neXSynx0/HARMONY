"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 500, suffix: "+", label: "Produse Vândute", description: "Peste 500 de produse livrate cu succes în toată România" },
  { value: 100, suffix: "%", label: "Ingrediente Naturale", description: "Fiecare produs conține exclusiv ingrediente naturale certificate" },
  { value: 50, suffix: "+", label: "Varietăți de Produse", description: "O gamă diversificată de cosmetice pentru toate nevoile" },
  { value: 1000, suffix: "+", label: "Clienți Mulțumiți", description: "Comunitate în creștere de clienți fideli și satisfăcuți" },
  { value: 98, suffix: "%", label: "Rata de Satisfacție", description: "Clienții noștri recomandă produsele Pure Harmony prietenilor" },
  { value: 0, suffix: "", label: "Substanțe Chimice", description: "Zero substanțe chimice nocive în toate produsele noastre" },
]

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const start = performance.now()

    function update(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }, [isVisible, target])

  return (
    <span className="font-[var(--font-bebas)] text-5xl md:text-7xl text-accent leading-none">
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        },
      )

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 85%",
        onEnter: () => setIsVisible(true),
      })

      const items = gridRef.current?.querySelectorAll("article")
      if (items && items.length > 0) {
        gsap.set(items, { y: 40, opacity: 0 })
        gsap.to(items, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="relative py-24 pl-4 md:pl-24 pr-4 md:pr-10">
      <div ref={headerRef} className="mb-12">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">06 / Impact</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">IMPACTUL NOSTRU</h2>
        <p className="mt-3 max-w-xl font-mono text-[11px] text-muted-foreground leading-relaxed">
          Cifrele vorbesc de la sine. Pure Harmony a crescut organic, construind o comunitate
          puternică de consumatori conștienți.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <article
            key={index}
            className="group relative bg-white/40 backdrop-blur-sm border border-border/40 p-6 md:p-8 transition-all duration-500 hover:border-accent/40"
          >
            <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
            <h3 className="mt-3 font-[var(--font-bebas)] text-xl tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
              {stat.label}
            </h3>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground leading-relaxed">{stat.description}</p>
            <span className="absolute top-3 right-3 font-mono text-[9px] text-muted-foreground/30 group-hover:text-accent/50 transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
