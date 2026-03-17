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
    text: "Lumânarea aromată eco este preferata mea! Arde uniform, are un parfum delicat și natural, și durează mult. Calitate premium la un preț corect.",
  },
  {
    name: "Cristian D.",
    location: "Iași",
    rating: 4,
    text: "Uleiul esențial de mentă este genial pentru aromaterapie. Îl folosesc zilnic și mă ajută să mă relaxez după o zi lungă. Calitatea se simte.",
  },
  {
    name: "Ioana R.",
    location: "Brașov",
    rating: 5,
    text: "Șamponul organic cu rozmarin mi-a transformat părul! După doar câteva utilizări, părul meu este mai strălucitor și mai sănătos. Fără sulfați, fără parabeni.",
  },
  {
    name: "Alexandru T.",
    location: "Constanța",
    rating: 5,
    text: "Am comandat balsamul de buze natural pentru soția mea și acum folosim amândoi produse Pure Harmony. Calitatea este excepțională.",
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
    <section ref={sectionRef} id="testimonials" className="relative py-24 pl-4 md:pl-24 pr-4 md:pr-10">
      <div ref={headerRef} className="mb-12">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">05 / Testimoniale</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">CE SPUN CLIENȚII</h2>
        <p className="mt-3 max-w-xl font-mono text-[11px] text-muted-foreground leading-relaxed">
          Feedback-ul clienților noștri este cea mai mare recompensă. Iată ce spun cei care au ales
          produsele Pure Harmony.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <article
            key={index}
            className="group relative bg-white/50 backdrop-blur-sm border border-border/40 p-6 transition-all duration-500 hover:border-accent/40 hover:shadow-lg"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-sm",
                    i < testimonial.rating ? "text-accent" : "text-border",
                  )}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="font-mono text-[10px] text-foreground/80 leading-relaxed mb-6">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            <div className="mt-auto border-t border-border/30 pt-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] font-semibold text-foreground">{testimonial.name}</span>
                <span className="font-mono text-[9px] text-muted-foreground block">{testimonial.location}</span>
              </div>
              <span className="font-mono text-[8px] uppercase tracking-widest text-accent">Verificat</span>
            </div>

            <div className="absolute top-0 left-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-accent" />
              <div className="absolute top-0 left-0 w-[1px] h-full bg-accent" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
