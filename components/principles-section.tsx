"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  const principles = [
    { number: "01", titleParts: [{ text: "CALITATE", highlight: true }, { text: " NATURALĂ", highlight: false }], description: "Ingrediente pure, selectate cu grijă. Fiecare produs testat riguros pentru cele mai înalte standarde.", align: "left" },
    { number: "02", titleParts: [{ text: "SUSTENABILITATE", highlight: true }, { text: " REALĂ", highlight: false }], description: "Ambalaje reciclabile, producție eco-friendly. Angajament real față de protejarea mediului.", align: "right" },
    { number: "03", titleParts: [{ text: "ARMONIE ", highlight: false }, { text: "COMPLETĂ", highlight: true }], description: "Echilibru între natură și știință. Produse care respectă pielea și planeta.", align: "left" },
    { number: "04", titleParts: [{ text: "TRANSPARENȚĂ ", highlight: false }, { text: "TOTALĂ", highlight: true }], description: "Ingrediente vizibile, procese deschise. Știi exact ce aplici — fără secrete.", align: "right" },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { x: -40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        gsap.from(article, {
          x: principles[index].align === "right" ? 60 : -60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: article, start: "top 85%", toggleActions: "play none none reverse" },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8">
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">04 / Valori</span>
        <h2 className="mt-2 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight text-white">VALORILE NOASTRE</h2>
        <p className="mt-2 max-w-md font-mono text-[9px] text-white/50 leading-relaxed">
          Principiile care ne definesc identitatea și ghidează fiecare decizie.
        </p>
      </div>
      <div ref={principlesRef} className="space-y-16 md:space-y-24">
        {principles.map((p, i) => (
          <article key={i} className={`flex flex-col ${p.align === "right" ? "items-end text-right" : "items-start text-left"}`}>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 mb-2">{p.number} / {p.titleParts[0].text.split(" ")[0]}</span>
            <h3 className="font-[var(--font-bebas)] text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none text-white">
              {p.titleParts.map((part, j) =>
                part.highlight ? <HighlightText key={j} parallaxSpeed={0.6}>{part.text}</HighlightText> : <span key={j}>{part.text}</span>
              )}
            </h3>
            <p className="mt-3 max-w-sm font-mono text-[9px] text-white/50 leading-relaxed">{p.description}</p>
            <div className={`mt-4 h-[1px] bg-white/10 w-16 md:w-32 ${p.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
