"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { name: "Maria P.", location: "București", rating: 5, text: "Produsele Pure Harmony m-au cucerit din prima comandă! Săpunul cu lavandă are un parfum incredibil." },
  { name: "Andrei M.", location: "Cluj-Napoca", rating: 5, text: "Crema hidratantă cu aloe este perfectă pentru tenul meu sensibil. Ambalajele reciclabile sunt un mare plus." },
  { name: "Elena S.", location: "Timișoara", rating: 5, text: "Lumânarea aromată eco este preferata mea! Arde uniform, parfum delicat și natural." },
  { name: "Cristian D.", location: "Iași", rating: 4, text: "Uleiul esențial de mentă este genial pentru aromaterapie. Calitatea se simte." },
  { name: "Ioana R.", location: "Brașov", rating: 5, text: "Șamponul organic cu rozmarin mi-a transformat părul! Fără sulfați, fără parabeni." },
  { name: "Alexandru T.", location: "Constanța", rating: 5, text: "Calitatea este excepțională, iar faptul că sunt eco-friendly ne face să ne simțim bine cu alegerile noastre." },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 40, opacity: 0 })
        gsap.to(cards, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 90%", toggleActions: "play none none reverse" },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8">
      <div ref={headerRef} className="mb-10">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">05 / Testimoniale</span>
        <h2 className="mt-2 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight text-white">CE SPUN CLIENȚII</h2>
        <p className="mt-2 max-w-md font-mono text-[9px] text-white/50 leading-relaxed">
          Feedback-ul clienților noștri este cea mai mare recompensă.
        </p>
      </div>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {testimonials.map((t, i) => (
          <article key={i} className="group relative bg-white/3 backdrop-blur-sm border border-white/8 p-5 transition-all duration-500 hover:border-accent/40">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className={cn("text-xs", j < t.rating ? "text-accent" : "text-white/10")}>★</span>
              ))}
            </div>
            <p className="font-mono text-[9px] text-white/60 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
            <div className="mt-auto border-t border-white/8 pt-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] font-semibold text-white">{t.name}</span>
                <span className="font-mono text-[8px] text-white/30 block">{t.location}</span>
              </div>
              <span className="font-mono text-[7px] uppercase tracking-widest text-accent">Verificat</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
