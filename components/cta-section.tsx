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
      gsap.fromTo(contentRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8">
      <div ref={contentRef} className="relative bg-accent/8 border border-accent/20 p-8 md:p-14 text-center">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-10 h-10">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent" />
          <div className="absolute top-0 left-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute top-0 right-0 w-10 h-10">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-accent" />
          <div className="absolute top-0 right-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute bottom-0 left-0 w-10 h-10">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
          <div className="absolute bottom-0 left-0 w-[2px] h-full bg-accent" />
        </div>
        <div className="absolute bottom-0 right-0 w-10 h-10">
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-accent" />
          <div className="absolute bottom-0 right-0 w-[2px] h-full bg-accent" />
        </div>

        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">08 / Comunitate</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-3xl md:text-5xl lg:text-6xl tracking-tight text-white">
          ALĂTURĂ-TE<br />COMUNITĂȚII<br />PURE HARMONY
        </h2>
        <p className="mt-4 max-w-md mx-auto font-mono text-[9px] text-white/50 leading-relaxed">
          Abonează-te la newsletter pentru oferte exclusive și sfaturi de îngrijire naturală.
        </p>
        <div className="mt-6 max-w-xs mx-auto flex flex-col md:flex-row gap-2">
          <input type="email" placeholder="adresa@email.com"
            className="flex-1 border border-white/15 bg-white/5 px-4 py-2 font-mono text-[9px] text-white placeholder:text-white/30 outline-none focus:border-accent transition-colors duration-200" />
          <button className="bg-accent text-white px-5 py-2 font-mono text-[8px] uppercase tracking-widest hover:bg-accent/80 transition-colors duration-200">Abonează-te</button>
        </div>
        <p className="mt-3 font-mono text-[8px] text-white/25">Renunți oricând. Confidențialitate garantată.</p>
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-xs mx-auto">
          <div>
            <span className="font-[var(--font-bebas)] text-2xl text-accent">1000+</span>
            <span className="block font-mono text-[7px] uppercase tracking-widest text-white/30 mt-1">Abonați</span>
          </div>
          <div>
            <span className="font-[var(--font-bebas)] text-2xl text-accent">20%</span>
            <span className="block font-mono text-[7px] uppercase tracking-widest text-white/30 mt-1">Reducere</span>
          </div>
          <div>
            <span className="font-[var(--font-bebas)] text-2xl text-accent">2026</span>
            <span className="block font-mono text-[7px] uppercase tracking-widest text-white/30 mt-1">Lansare</span>
          </div>
        </div>
      </div>
    </section>
  )
}
