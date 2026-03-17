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
    {
      number: "01",
      titleParts: [
        { text: "CALITATE", highlight: true },
        { text: " NATURALĂ", highlight: false },
      ],
      description: "Ingrediente pure, selectate cu grijă, pentru rezultate excepționale. Fiecare produs este testat riguros pentru a garanta cele mai înalte standarde de calitate.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "SUSTENABILITATE", highlight: true },
        { text: " REALĂ", highlight: false },
      ],
      description: "Ambalaje reciclabile, producție eco-friendly și un angajament real față de protejarea mediului. Fiecare etapă minimizează impactul asupra naturii.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "ARMONIE ", highlight: false },
        { text: "COMPLETĂ", highlight: true },
      ],
      description: "Echilibru perfect între natură și știință. Produse care respectă atât pielea, cât și planeta. Frumusețe adevărată prin ingrediente naturale.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "TRANSPARENȚĂ ", highlight: false },
        { text: "TOTALĂ", highlight: true },
      ],
      description: "Ingrediente vizibile, procese deschise. Știi exact ce aplici pe pielea ta — fără secrete, fără ingrediente ascunse. Alegeri informate.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })

      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = principles[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: article, start: "top 85%", toggleActions: "play none none reverse" },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-24 pl-4 md:pl-24 pr-4 md:pr-10">
      <div ref={headerRef} className="mb-20">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">04 / Valori</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">VALORILE NOASTRE</h2>
        <p className="mt-3 max-w-xl font-mono text-[11px] text-muted-foreground leading-relaxed">
          Valorile Pure Harmony stau la baza fiecărei decizii pe care o luăm. Aceste principii ne definesc identitatea.
        </p>
      </div>

      <div ref={principlesRef} className="space-y-20 md:space-y-28">
        {principles.map((principle, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              principle.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              {principle.number} / {principle.titleParts[0].text.split(" ")[0]}
            </span>

            <h3 className="font-[var(--font-bebas)] text-3xl md:text-5xl lg:text-7xl tracking-tight leading-none">
              {principle.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            <p className="mt-4 max-w-md font-mono text-[11px] text-muted-foreground leading-relaxed">
              {principle.description}
            </p>

            <div className={`mt-6 h-[1px] bg-border w-20 md:w-40 ${principle.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
