"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Maria P.",
    location: "București",
    rating: 5,
    text: "Produsele Pure Harmony m-au cucerit din prima comandă! Săpunul cu lavandă are un parfum incredibil și lasă pielea catifelată. Recomand cu căldură tuturor celor care caută produse naturale de calitate.",
  },
  {
    name: "Andrei M.",
    location: "Cluj-Napoca",
    rating: 5,
    text: "Am trecut la produsele naturale Pure Harmony acum 3 luni și diferența se vede! Crema hidratantă cu aloe este perfectă pentru tenul meu sensibil. Și ambalajele reciclabile sunt un mare plus.",
  },
  {
    name: "Elena S.",
    location: "Timișoara",
    rating: 5,
    text: "Lumânarea aromată eco este preferata mea! Arde uniform, are un parfum delicat și natural, și durează mult. Calitate premium la un preț corect. Pure Harmony a devenit brandul meu de suflet.",
  },
  {
    name: "Cristian D.",
    location: "Iași",
    rating: 4,
    text: "Uleiul esențial de mentă este genial pentru aromaterapie. Îl folosesc zilnic și mă ajută să mă relaxez după o zi lungă. Calitatea se simte, iar livrarea a fost rapidă și în ambalaje eco.",
  },
  {
    name: "Ioana R.",
    location: "Brașov",
    rating: 5,
    text: "Șamponul organic cu rozmarin mi-a transformat părul! După doar câteva utilizări, părul meu este mai strălucitor și mai sănătos. Fără sulfați, fără parabeni — exact ce căutam de mult timp.",
  },
  {
    name: "Alexandru T.",
    location: "Constanța",
    rating: 5,
    text: "Am comandat balsamul de buze natural pentru soția mea și acum folosim amândoi produse Pure Harmony. Calitatea este excepțională, iar faptul că sunt eco-friendly ne face să ne simțim bine cu alegerile noastre.",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

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

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 50, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">05 / Testimoniale</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">CE SPUN CLIENȚII</h2>
        <p className="mt-4 max-w-2xl font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
          Feedback-ul clienților noștri este cea mai mare recompensă. Iată ce spun cei care au ales
          produsele Pure Harmony pentru îngrijirea lor personală.
        </p>
      </div>

      {/* Testimonials grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <article
            key={index}
            className="group relative bg-white/60 backdrop-blur-sm border border-border/40 p-8 transition-all duration-500 hover:border-accent/40 hover:shadow-lg"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-lg",
                    i < testimonial.rating ? "text-accent" : "text-border",
                  )}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="font-mono text-xs md:text-sm text-foreground/80 leading-relaxed mb-8">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-auto border-t border-border/30 pt-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-sm font-semibold text-foreground">{testimonial.name}</span>
                <span className="font-mono text-[11px] text-muted-foreground block">{testimonial.location}</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Verificat</span>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-accent" />
              <div className="absolute top-0 left-0 w-[1px] h-full bg-accent" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
