"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    date: "Viziune",
    title: "Viziunea Companiei",
    note: "Pure Harmony își propune să devină lider pe piața produselor cosmetice naturale din România, promovând un stil de viață sănătos și sustenabil. Ne dorim ca fiecare persoană să aibă acces la produse cosmetice de calitate, realizate exclusiv din ingrediente naturale.",
  },
  {
    date: "Valori",
    title: "Valorile Companiei",
    note: "Calitate, Sustenabilitate, Conștiență ecologică și Diversitate — principiile care ne ghidează în tot ceea ce facem. Credem că frumusețea adevărată vine din respectul față de natură și din alegerea ingredientelor potrivite pentru fiecare tip de piele.",
  },
  {
    date: "Afacere",
    title: "Ideea de Afacere",
    note: "Produse cosmetice naturale realizate din ingrediente organice, fără substanțe chimice nocive, pentru persoane care își doresc un stil de viață natural. Combinăm rețete tradiționale cu tehnologii moderne de producție pentru rezultate excepționale.",
  },
  {
    date: "Motivație",
    title: "De Ce Pure Harmony?",
    note: "Ingrediente 100% naturale, ambalaje reciclabile, producție eco-friendly și prețuri accesibile pentru toți consumatorii conștienți. Fiecare produs poartă amprenta pasiunii noastre pentru natură și a angajamentului față de sănătatea clienților.",
  },
  {
    date: "Piață",
    title: "Piața Țintă",
    note: "Persoane conștiente de mediu, cu vârsta între 18-45 ani, care aleg produse naturale și sustenabile pentru îngrijirea personală. Piața cosmenticelor naturale crește cu 15% anual în România, iar noi suntem poziționați perfect pentru acest trend.",
  },
  {
    date: "Certificări",
    title: "Standarde & Certificări",
    note: "Toate produsele noastre sunt certificate organic conform standardelor europene. Deținem certificări ECOCERT și COSMOS ORGANIC, garantând puritatea și calitatea fiecărui ingredient utilizat în formulele noastre.",
  },
  {
    date: "Istorie",
    title: "Povestea Noastră",
    note: "Fondată din pasiunea pentru produse naturale, Pure Harmony a început ca un mic atelier artizanal. În 2026, ne-am transformat într-o companie cu o gamă completă de produse cosmetice, păstrând aceleași valori de la început: naturalețe, calitate și respect.",
  },
  {
    date: "Comunitate",
    title: "Comunitatea Pure Harmony",
    note: "Am construit o comunitate de peste 1000 de persoane care împărtășesc aceleași valori. Organizăm ateliere de producție naturală, evenimente eco-friendly și campanii de conștientizare a beneficiilor produselor naturale.",
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-24 pl-4 md:pl-24">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-10 h-10 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-12 pr-4 md:pr-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">01 / Prezentare</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">DESPRE COMPANIE</h2>
        <p className="mt-3 max-w-xl font-mono text-[11px] text-muted-foreground leading-relaxed">
          Pure Harmony S.R.L. este o companie românească dedicată creării de produse cosmetice naturale de cea mai
          înaltă calitate. Descoperă viziunea, valorile și povestea din spatele brandului nostru.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="flex gap-6 overflow-x-auto pb-6 pr-10 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {signals.map((signal, index) => (
          <SignalCard key={index} signal={signal} index={index} />
        ))}
      </div>
    </section>
  )
}

function SignalCard({
  signal,
  index,
}: {
  signal: { date: string; title: string; note: string }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-72",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      <div className="relative bg-white/60 backdrop-blur-sm border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-6">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        <div className="flex items-baseline justify-between mb-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          <time className="font-mono text-[9px] text-muted-foreground/60">{signal.date}</time>
        </div>

        <h3 className="font-[var(--font-bebas)] text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
          {signal.title}
        </h3>

        <div className="w-10 h-px bg-accent/60 mb-4 group-hover:w-full transition-all duration-500" />

        <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{signal.note}</p>

        <div className="absolute bottom-0 right-0 w-5 h-5 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-7 h-7 bg-background rotate-45 translate-x-3.5 translate-y-3.5 border-t border-l border-border/30" />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
