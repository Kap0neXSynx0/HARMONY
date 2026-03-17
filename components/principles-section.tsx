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
      description: "Ingrediente pure, selectate cu grijă, pentru rezultate excepționale. Fiecare produs este testat riguros pentru a garanta cele mai înalte standarde de calitate. Nu facem compromisuri când vine vorba de sănătatea clienților noștri.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "SUSTENABILITATE", highlight: true },
        { text: " REALĂ", highlight: false },
      ],
      description: "Ambalaje reciclabile, producție eco-friendly și un angajament real față de protejarea mediului. Ne asigurăm că fiecare etapă a procesului de producție minimizează impactul asupra naturii. Viitorul planetei este responsabilitatea noastră.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "ARMONIE ", highlight: false },
        { text: "COMPLETĂ", highlight: true },
      ],
      description: "Echilibru perfect între natură și știință. Produse care respectă atât pielea, cât și planeta. Credem că adevărata frumusețe vine din armonia dintre ingredientele naturale și formulările moderne, validate științific.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "TRANSPARENȚĂ ", highlight: false },
        { text: "TOTALĂ", highlight: true },
      ],
      description: "Ingrediente vizibile, procese deschise. Știi exact ce aplici pe pielea ta — fără secrete, fără ingrediente ascunse. Publicăm lista completă de ingrediente și sursa fiecăruia, pentru că meriti să faci alegeri informate.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Each principle slides in from its aligned side
      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = principles[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">04 / Valori</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">VALORILE NOASTRE</h2>
        <p className="mt-4 max-w-2xl font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
          Valorile Pure Harmony stau la baza fiecărei decizii pe care o luăm. De la selecția ingredientelor
          până la modul în care ne tratăm clienții, aceste principii ne definesc identitatea.
        </p>
      </div>

      {/* Staggered principles */}
      <div ref={principlesRef} className="space-y-24 md:space-y-32">
        {principles.map((principle, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              principle.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {/* Annotation label */}
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {principle.number} / {principle.titleParts[0].text.split(" ")[0]}
            </span>

            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none">
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

            {/* Description */}
            <p className="mt-6 max-w-lg font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
              {principle.description}
            </p>

            {/* Decorative line */}
            <div className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${principle.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
