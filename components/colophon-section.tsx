"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      if (headerRef.current) gsap.from(headerRef.current, { x: -40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" } })
      if (gridRef.current) {
        const cols = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(cols, { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" } })
      }
      if (footerRef.current) gsap.from(footerRef.current, { y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 95%", toggleActions: "play none none reverse" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="colophon" className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8 border-t border-white/8">
      <div ref={headerRef} className="mb-10">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">09 / Contact</span>
        <h2 className="mt-2 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight text-white">CONTACT & INFORMAȚII</h2>
      </div>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
        <div>
          <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 mb-3">Companie</h4>
          <ul className="space-y-1">
            <li className="font-mono text-[10px] text-white/60">Pure Harmony S.R.L.</li>
            <li className="font-mono text-[10px] text-white/60">Produse Naturale</li>
            <li className="font-mono text-[10px] text-white/60">CUI: RO12345678</li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 mb-3">Sediu</h4>
          <ul className="space-y-1">
            <li className="font-mono text-[10px] text-white/60">România</li>
            <li className="font-mono text-[10px] text-white/60">București, Sector 1</li>
            <li className="font-mono text-[10px] text-white/60">Str. Naturii Nr. 42</li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 mb-3">Produse</h4>
          <ul className="space-y-1">
            <li className="font-mono text-[10px] text-white/60">Cosmetice Naturale</li>
            <li className="font-mono text-[10px] text-white/60">Uleiuri Esențiale</li>
            <li className="font-mono text-[10px] text-white/60">Îngrijire Personală</li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 mb-3">Echipa</h4>
          <ul className="space-y-1">
            <li className="font-mono text-[10px] text-white/60">Director General</li>
            <li className="font-mono text-[10px] text-white/60">Manager Producție</li>
            <li className="font-mono text-[10px] text-white/60">Manager Marketing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 mb-3">Contact</h4>
          <ul className="space-y-1">
            <li><a href="mailto:contact@pureharmony.ro" className="font-mono text-[10px] text-white/60 hover:text-accent transition-colors">contact@pureharmony.ro</a></li>
            <li className="font-mono text-[10px] text-white/60">+40 721 234 567</li>
            <li><a href="#" className="font-mono text-[10px] text-white/60 hover:text-accent transition-colors">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30 mb-3">An</h4>
          <ul className="space-y-1">
            <li className="font-mono text-[10px] text-white/60">2026</li>
            <li className="font-mono text-[10px] text-white/60">Lansare Q2 2026</li>
          </ul>
        </div>
      </div>
      <div ref={footerRef} className="mt-16 pt-4 border-t border-white/8 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest">© 2026 Pure Harmony S.R.L. Toate drepturile rezervate.</p>
        <p className="font-mono text-[8px] text-white/30">Creat cu grijă. Construit cu pasiune.</p>
      </div>
    </section>
  )
}
