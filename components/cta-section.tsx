"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div
        ref={contentRef}
        className="relative bg-accent/10 border border-accent/30 backdrop-blur-sm p-12 md:p-20 text-center"
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent" />
          <div className="absolute top-0 left-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute top-0 right-0 w-16 h-16">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-accent" />
          <div className="absolute top-0 right-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
          <div className="absolute bottom-0 left-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16">
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-accent" />
          <div className="absolute bottom-0 right-0 w-[2px] h-full bg-accent" />
        </div>

        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">08 / Comunitate</span>

        <h2 className="mt-6 font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight">
          ALĂTURĂ-TE<br />COMUNITĂȚII<br />PURE HARMONY
        </h2>

        <p className="mt-8 max-w-2xl mx-auto font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
          Fii parte din comunitatea noastră de oameni care aleg un stil de viață natural și sustenabil.
          Abonează-te la newsletter pentru oferte exclusive, noutăți și sfaturi de îngrijire naturală.
        </p>

        {/* Email signup */}
        <div className="mt-10 max-w-md mx-auto flex flex-col md:flex-row gap-3">
          <input
            type="email"
            placeholder="adresa@email.com"
            className="flex-1 border border-border bg-white/80 backdrop-blur-sm px-5 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors duration-200"
          />
          <button className="border border-accent bg-accent text-white px-8 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent/90 transition-colors duration-200">
            Abonează-te
          </button>
        </div>

        <p className="mt-6 font-mono text-[11px] text-muted-foreground/60">
          Prin abonare, ești de acord cu politica noastră de confidențialitate. Poți renunța oricând.
        </p>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <span className="font-[var(--font-bebas)] text-3xl md:text-4xl text-accent">1000+</span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Abonați</span>
          </div>
          <div>
            <span className="font-[var(--font-bebas)] text-3xl md:text-4xl text-accent">20%</span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Reducere</span>
          </div>
          <div>
            <span className="font-[var(--font-bebas)] text-3xl md:text-4xl text-accent">2026</span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Anul Lansării</span>
          </div>
        </div>
      </div>
    </section>
  )
}
