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
    description: "Selectăm cele mai pure ingrediente naturale și organice de la furnizori locali certificați. Fiecare ingredient este verificat pentru puritate și calitate.",
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
    description: "Fiecare produs trece prin verificări riguroase pentru a asigura cele mai înalte standarde.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Livrare Verde",
    medium: "Transport",
    description: "Transport eco-friendly cu ambalaje minime și opțiuni de livrare sustenabile în toată România.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Feedback Clienți",
    medium: "Îmbunătățire",
    description: "Ascultăm clienții noștri pentru a îmbunătăți continuu produsele și serviciile oferite.",
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
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-24 pl-4 md:pl-24 pr-4 md:pr-10">
      {/* Section header */}
      <div ref={headerRef} className="mb-12 flex items-end justify-between">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">02 / Producție</span>
          <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">PROCESUL NOSTRU</h2>
          <p className="mt-3 max-w-md font-mono text-[11px] text-muted-foreground leading-relaxed">
            Fiecare produs Pure Harmony parcurge un proces riguros de la selecția ingredientelor până la livrarea
            finală. Transparența și calitatea sunt în centrul a tot ceea ce facem.
          </p>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-[11px] text-muted-foreground text-right leading-relaxed">
          De la ingrediente naturale la produsul final — fiecare etapă este gândită pentru sustenabilitate.
        </p>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[170px]"
      >
        {processes.map((process, index) => (
          <WorkCard key={index} experiment={process} index={index} persistHover={index === 0} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  experiment,
  index,
  persistHover = false,
}: {
  experiment: {
    title: string
    medium: string
    description: string
    span: string
  }
  index: number
  persistHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/40 p-4 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden bg-white/30 backdrop-blur-sm",
        experiment.span,
        isActive && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="relative z-10">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          {experiment.medium}
        </span>
        <h3
          className={cn(
            "mt-2 font-[var(--font-bebas)] text-xl md:text-3xl tracking-tight transition-colors duration-300",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {experiment.title}
        </h3>
      </div>

      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-[10px] text-muted-foreground leading-relaxed transition-all duration-500 max-w-[280px]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {experiment.description}
        </p>
      </div>

      <span
        className={cn(
          "absolute bottom-3 right-3 font-mono text-[9px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={cn(
          "absolute top-0 right-0 w-10 h-10 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
