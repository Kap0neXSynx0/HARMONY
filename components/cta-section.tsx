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
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="relative py-24 pl-4 md:pl-24 pr-4 md:pr-10">
      <div
        ref={contentRef}
        className="relative bg-accent/10 border border-accent/30 backdrop-blur-sm p-10 md:p-16 text-center"
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent" />
          <div className="absolute top-0 left-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute top-0 right-0 w-12 h-12">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-accent" />
          <div className="absolute top-0 right-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
          <div className="absolute bottom-0 left-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-accent" />
          <div className="absolute bottom-0 right-0 w-[2px] h-full bg-accent" />
        </div>

        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">08 / Comunitate</span>

        <h2 className="mt-4 font-[var(--font-bebas)] text-3xl md:text-5xl lg:text-7xl tracking-tight">
          ALĂTURĂ-TE<br />COMUNITĂȚII<br />PURE HARMONY
        </h2>

        <p className="mt-6 max-w-xl mx-auto font-mono text-[11px] text-muted-foreground leading-relaxed">
          Fii parte din comunitatea noastră de oameni care aleg un stil de viață natural și sustenabil.
          Abonează-te la newsletter pentru oferte exclusive și sfaturi de îngrijire naturală.
        </p>

        <div className="mt-8 max-w-sm mx-auto flex flex-col md:flex-row gap-2">
          <input
            type="email"
            placeholder="adresa@email.com"
            className="flex-1 border border-border bg-white/80 backdrop-blur-sm px-4 py-2 font-mono text-[11px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors duration-200"
          />
          <button className="border border-accent bg-accent text-white px-6 py-2 font-mono text-[9px] uppercase tracking-widest hover:bg-accent/90 transition-colors duration-200">
            Abonează-te
          </button>
        </div>

        <p className="mt-4 font-mono text-[9px] text-muted-foreground/60">
          Prin abonare, ești de acord cu politica noastră de confidențialitate.
        </p>

        <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          <div>
            <span className="font-[var(--font-bebas)] text-2xl md:text-3xl text-accent">1000+</span>
            <span className="block font-mono text-[8px] uppercase tracking-widest text-muted-foreground mt-1">Abonați</span>
          </div>
          <div>
            <span className="font-[var(--font-bebas)] text-2xl md:text-3xl text-accent">20%</span>
            <span className="block font-mono text-[8px] uppercase tracking-widest text-muted-foreground mt-1">Reducere</span>
          </div>
          <div>
            <span className="font-[var(--font-bebas)] text-2xl md:text-3xl text-accent">2026</span>
            <span className="block font-mono text-[8px] uppercase tracking-widest text-muted-foreground mt-1">Anul Lansării</span>
          </div>
        </div>
      </div>
    </section>
  )
}
