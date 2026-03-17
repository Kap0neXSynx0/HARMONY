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
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        })
      }
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        })
      }
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%", toggleActions: "play none none reverse" },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-24 pl-4 md:pl-24 pr-4 md:pr-10 border-t border-border/30"
    >
      <div ref={headerRef} className="mb-12">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">09 / Contact</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">CONTACT & INFORMAȚII</h2>
        <p className="mt-3 max-w-md font-mono text-[11px] text-muted-foreground leading-relaxed">
          Ne poți contacta oricând pentru comenzi, întrebări sau colaborări.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10">
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Companie</h4>
          <ul className="space-y-1.5">
            <li className="font-mono text-[11px] text-foreground/80">Pure Harmony S.R.L.</li>
            <li className="font-mono text-[11px] text-foreground/80">Produse Naturale</li>
            <li className="font-mono text-[11px] text-foreground/80">CUI: RO12345678</li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Sediu</h4>
          <ul className="space-y-1.5">
            <li className="font-mono text-[11px] text-foreground/80">România</li>
            <li className="font-mono text-[11px] text-foreground/80">București, Sector 1</li>
            <li className="font-mono text-[11px] text-foreground/80">Str. Naturii Nr. 42</li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Produse</h4>
          <ul className="space-y-1.5">
            <li className="font-mono text-[11px] text-foreground/80">Cosmetice Naturale</li>
            <li className="font-mono text-[11px] text-foreground/80">Uleiuri Esențiale</li>
            <li className="font-mono text-[11px] text-foreground/80">Îngrijire Personală</li>
            <li className="font-mono text-[11px] text-foreground/80">Aromaterapie</li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Echipa</h4>
          <ul className="space-y-1.5">
            <li className="font-mono text-[11px] text-foreground/80">Director General</li>
            <li className="font-mono text-[11px] text-foreground/80">Manager Producție</li>
            <li className="font-mono text-[11px] text-foreground/80">Manager Marketing</li>
            <li className="font-mono text-[11px] text-foreground/80">Manager Vânzări</li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Contact</h4>
          <ul className="space-y-1.5">
            <li>
              <a href="mailto:contact@pureharmony.ro" className="font-mono text-[11px] text-foreground/80 hover:text-accent transition-colors duration-200">
                contact@pureharmony.ro
              </a>
            </li>
            <li className="font-mono text-[11px] text-foreground/80">+40 721 234 567</li>
            <li>
              <a href="#" className="font-mono text-[11px] text-foreground/80 hover:text-accent transition-colors duration-200">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="font-mono text-[11px] text-foreground/80 hover:text-accent transition-colors duration-200">
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">An</h4>
          <ul className="space-y-1.5">
            <li className="font-mono text-[11px] text-foreground/80">2026</li>
            <li className="font-mono text-[11px] text-foreground/80">În dezvoltare</li>
            <li className="font-mono text-[11px] text-foreground/80">Lansare Q2 2026</li>
          </ul>
        </div>
      </div>

      <div
        ref={footerRef}
        className="mt-20 pt-6 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
      >
        <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
          © 2026 Pure Harmony S.R.L. Toate drepturile rezervate.
        </p>
        <p className="font-mono text-[9px] text-muted-foreground">Creat cu grijă. Construit cu pasiune.</p>
      </div>
    </section>
  )
}
