"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const processes = [
  {
    title: "Ingrediente Naturale",
    medium: "Selecție",
    description: "Selectăm cele mai pure ingrediente naturale și organice de la furnizori locali certificați.",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Producție Ecologică",
    medium: "Fabricare",
    description: "Procesul de producție respectă normele ecologice, fără emisii nocive și cu consum redus de energie.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Ambalare Sustenabilă",
    medium: "Ambalaje",
    description: "Folosim ambalaje 100% reciclabile și biodegradabile pentru protejarea mediului.",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Control Calitate",
    medium: "Testare",
    description: "Fiecare produs trece prin verificări riguroase pentru cele mai înalte standarde.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Livrare Verde",
    medium: "Transport",
    description: "Transport eco-friendly cu ambalaje minime și opțiuni de livrare sustenabile.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Feedback Clienți",
    medium: "Îmbunătățire",
    description: "Ascultăm clienții noștri pentru a îmbunătăți continuu produsele și serviciile.",
    span: "col-span-1 row-span-1",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 90%", toggleActions: "play none none reverse" },
      })
      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 40, opacity: 0 })
        gsap.to(cards, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 90%", toggleActions: "play none none reverse" },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8">
      <div ref={headerRef} className="mb-10 flex items-end justify-between">
        <div>
          <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">02 / Producție</span>
          <h2 className="mt-2 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight text-white">PROCESUL NOSTRU</h2>
          <p className="mt-2 max-w-sm font-mono text-[9px] text-white/50 leading-relaxed">
            De la selecția ingredientelor până la livrare — transparență și calitate la fiecare pas.
          </p>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-[9px] text-white/40 text-right leading-relaxed">
          Fiecare etapă este gândită pentru sustenabilitate.
        </p>
      </div>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[140px] md:auto-rows-[160px]">
        {processes.map((process, index) => (
          <WorkCard key={index} experiment={process} index={index} persistHover={index === 0} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({ experiment, index, persistHover = false }: {
  experiment: { title: string; medium: string; description: string; span: string }
  index: number; persistHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: cardRef.current, start: "top 80%", onEnter: () => setIsScrollActive(true) })
    }, cardRef)
    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-white/8 p-4 flex flex-col justify-between transition-all duration-500 overflow-hidden bg-white/3 backdrop-blur-sm",
        experiment.span,
        isActive && "border-accent/50 bg-accent/5",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">{experiment.medium}</span>
        <h3 className={cn(
          "mt-2 font-[var(--font-bebas)] text-lg md:text-2xl tracking-tight transition-colors duration-300",
          isActive ? "text-accent" : "text-white",
        )}>{experiment.title}</h3>
      </div>
      <div className="relative z-10">
        <p className={cn(
          "font-mono text-[8px] text-white/40 leading-relaxed transition-all duration-500 max-w-[260px]",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        )}>{experiment.description}</p>
      </div>
      <span className={cn(
        "absolute bottom-3 right-3 font-mono text-[8px] transition-colors duration-300",
        isActive ? "text-accent" : "text-white/15",
      )}>{String(index + 1).padStart(2, "0")}</span>
      <div className={cn("absolute top-0 right-0 w-8 h-8 transition-all duration-500", isActive ? "opacity-100" : "opacity-0")}>
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
