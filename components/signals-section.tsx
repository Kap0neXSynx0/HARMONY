"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const signals = [
  {
    icon: "◆",
    title: "Viziunea Companiei",
    description: "Lider pe piața cosmeticelor naturale din România, promovând un stil de viață sănătos și sustenabil pentru fiecare.",
  },
  {
    icon: "●",
    title: "Valorile Noastre",
    description: "Calitate, Sustenabilitate, Conștiință ecologică și Diversitate — principiile care ghidează tot ce facem.",
  },
  {
    icon: "▲",
    title: "Ideea de Afacere",
    description: "Cosmetice naturale din ingrediente organice, fără substanțe chimice nocive, pentru un stil de viață natural.",
  },
  {
    icon: "■",
    title: "De Ce Noi?",
    description: "100% natural, ambalaje reciclabile, producție eco-friendly și prețuri accesibile pentru consumatori conștienți.",
  },
  {
    icon: "◇",
    title: "Piața Țintă",
    description: "Persoane conștiente de mediu, 18-45 ani, care aleg produse naturale și sustenabile pentru îngrijirea personală.",
  },
  {
    icon: "★",
    title: "Certificări",
    description: "Certificate ECOCERT și COSMOS ORGANIC, garantând puritatea și calitatea fiecărui ingredient utilizat.",
  },
  {
    icon: "◎",
    title: "Povestea Noastră",
    description: "De la un mic atelier artizanal la o companie cu gamă completă de cosmetice — păstrând aceleași valori de la început.",
  },
  {
    icon: "✦",
    title: "Comunitate",
    description: "Peste 1000 de persoane care împărtășesc aceleași valori. Ateliere, evenimente eco și campanii de conștientizare.",
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        },
      )

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
    <section id="signals" ref={sectionRef} className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8">
      {/* Header — centered */}
      <div ref={headerRef} className="mb-14 text-center">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">01 / Prezentare</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight text-white">DESPRE COMPANIE</h2>
        <p className="mt-3 max-w-lg mx-auto font-mono text-[10px] text-white/50 leading-relaxed">
          Pure Harmony S.R.L. — companie românească dedicată creării de cosmetice naturale premium.
        </p>
        <div className="mt-4 w-12 h-[2px] bg-accent mx-auto" />
      </div>

      {/* Tight 4-column grid */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {signals.map((signal, index) => (
          <article
            key={index}
            className={cn(
              "group relative p-5 border border-white/8 bg-white/3 backdrop-blur-sm",
              "transition-all duration-400 hover:border-accent/40 hover:bg-accent/5"
            )}
          >
            {/* Icon + number row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-accent text-sm">{signal.icon}</span>
              <span className="font-mono text-[8px] text-white/20">{String(index + 1).padStart(2, "0")}</span>
            </div>

            {/* Title */}
            <h3 className="font-[var(--font-bebas)] text-lg tracking-tight text-white group-hover:text-accent transition-colors duration-300 mb-2">
              {signal.title}
            </h3>

            {/* Divider */}
            <div className="w-6 h-[1px] bg-accent/40 mb-3 group-hover:w-full transition-all duration-500" />

            {/* Description */}
            <p className="font-mono text-[9px] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
              {signal.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
