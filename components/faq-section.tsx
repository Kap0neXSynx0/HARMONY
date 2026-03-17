"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  { question: "Ce ingrediente folosiți?", answer: "Exclusiv ingrediente naturale și organice certificate: uleiuri esențiale, aloe vera, ceară de albine, unt de shea, ulei de cocos și extracte vegetale." },
  { question: "Produsele sunt testate pe animale?", answer: "Nu. Pure Harmony este 100% cruelty-free. Nu testăm pe animale și nu colaborăm cu furnizori care o fac." },
  { question: "Cum se face livrarea?", answer: "Livrăm în toată România prin curier eco-friendly. Transport gratuit pentru comenzi peste 150 lei. 2-4 zile lucrătoare." },
  { question: "Pot returna un produs?", answer: "Da, garanție de satisfacție de 30 de zile. Contactează suportul pentru returnare sau înlocuire." },
  { question: "Ce termen de valabilitate au?", answer: "Între 6 și 18 luni, în funcție de produs. Data expirării e pe fiecare ambalaj." },
  { question: "Produse pentru piele sensibilă?", answer: "Da! Crema cu Aloe și Balsamul de Buze sunt recomandate special pentru piele sensibilă." },
  { question: "De ce prețuri accesibile?", answer: "Colaborăm direct cu producătorii, eliminând intermediarii. Optimizăm producția și distribuția." },
  { question: "Abonamente sau pachete?", answer: "Da! Pachete personalizabile și abonamente lunare cu reduceri de până la 20%. Anulezi oricând." },
]

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const answerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!answerRef.current) return
    if (isOpen) gsap.to(answerRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" })
    else gsap.to(answerRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" })
  }, [isOpen])

  return (
    <article className={cn("border border-white/8 bg-white/3 backdrop-blur-sm transition-all duration-300", isOpen && "border-accent/40")}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] text-accent flex-shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <h3 className={cn("font-[var(--font-bebas)] text-base md:text-lg tracking-tight transition-colors duration-300", isOpen ? "text-accent" : "text-white")}>{faq.question}</h3>
        </div>
        <span className={cn("font-mono text-lg text-white/30 transition-transform duration-300 flex-shrink-0", isOpen && "rotate-45")}>+</span>
      </button>
      <div ref={answerRef} className="overflow-hidden h-0 opacity-0">
        <div className="px-4 pb-4 pl-10">
          <p className="font-mono text-[9px] text-white/50 leading-relaxed max-w-2xl">{faq.answer}</p>
        </div>
      </div>
    </article>
  )
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !listRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
      const items = listRef.current?.querySelectorAll("article")
      if (items && items.length > 0) {
        gsap.set(items, { y: 20, opacity: 0 })
        gsap.to(items, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 90%", toggleActions: "play none none reverse" },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8">
      <div ref={headerRef} className="mb-10">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">07 / Întrebări</span>
        <h2 className="mt-2 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight text-white">ÎNTREBĂRI FRECVENTE</h2>
      </div>
      <div ref={listRef} className="space-y-2 max-w-2xl">
        {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
      </div>
    </section>
  )
}
