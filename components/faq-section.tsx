"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "Ce ingrediente folosiți în produsele voastre?",
    answer: "Folosim exclusiv ingrediente naturale și organice certificate. Principalele ingrediente includ uleiuri esențiale, extract de aloe vera, ceară de albine, unt de shea, ulei de cocos și extracte vegetale. Toate ingredientele sunt listate pe ambalajul fiecărui produs.",
  },
  {
    question: "Produsele sunt testate pe animale?",
    answer: "Nu, absolut nu. Pure Harmony este un brand 100% cruelty-free. Nu testăm niciun produs sau ingredient pe animale, și nici nu colaborăm cu furnizori care practică testarea pe animale.",
  },
  {
    question: "Cum se face livrarea și care sunt costurile?",
    answer: "Livrăm în toată România prin curier eco-friendly. Comenzile peste 150 lei beneficiază de transport gratuit. Livrarea standard durează 2-4 zile lucrătoare. Ambalajele sunt 100% reciclabile.",
  },
  {
    question: "Pot returna un produs dacă nu sunt mulțumit?",
    answer: "Da, oferim o garanție de satisfacție de 30 de zile. Dacă produsul nu corespunde așteptărilor tale, poți solicita returnarea sau înlocuirea acestuia.",
  },
  {
    question: "Produsele au termen de valabilitate?",
    answer: "Da, ca toate produsele naturale, cosmeticele noastre au termen de valabilitate între 6 și 18 luni. Data expirării este afișată clar pe fiecare ambalaj.",
  },
  {
    question: "Aveți produse potrivite pentru piele sensibilă?",
    answer: "Absolut! Majoritatea produselor noastre sunt formulate special pentru a fi blânde cu pielea sensibilă. Crema Hidratantă cu Aloe și Balsamul de Buze Natural sunt deosebit de recomandate.",
  },
  {
    question: "Cum vă mențineți prețurile accesibile?",
    answer: "Colaborăm direct cu producătorii de ingrediente naturale, eliminând intermediarii. Optimizăm procesele de producție și distribuție pentru prețuri corecte.",
  },
  {
    question: "Oferiți și abonamente sau pachete de produse?",
    answer: "Da! Oferim pachete speciale și abonamente lunare cu reduceri de până la 20%. Pachetele sunt personalizabile și pot fi anulate oricând.",
  },
]

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const answerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!answerRef.current) return
    if (isOpen) {
      gsap.to(answerRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" })
    } else {
      gsap.to(answerRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" })
    }
  }, [isOpen])

  return (
    <article
      className={cn(
        "border border-border/40 bg-white/40 backdrop-blur-sm transition-all duration-300",
        isOpen && "border-accent/40 shadow-md",
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 md:p-6 flex items-start justify-between gap-3 text-left"
      >
        <div className="flex items-start gap-3">
          <span className="font-mono text-[9px] text-accent mt-0.5 flex-shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "font-[var(--font-bebas)] text-lg md:text-xl tracking-tight transition-colors duration-300",
              isOpen ? "text-accent" : "text-foreground",
            )}
          >
            {faq.question}
          </h3>
        </div>
        <span
          className={cn(
            "font-mono text-xl text-muted-foreground transition-transform duration-300 flex-shrink-0",
            isOpen && "rotate-45",
          )}
        >
          +
        </span>
      </button>
      <div ref={answerRef} className="overflow-hidden h-0 opacity-0">
        <div className="px-4 md:px-6 pb-4 md:pb-6 pl-10 md:pl-14">
          <p className="font-mono text-[10px] text-muted-foreground leading-relaxed max-w-2xl">
            {faq.answer}
          </p>
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
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        },
      )

      const items = listRef.current?.querySelectorAll("article")
      if (items && items.length > 0) {
        gsap.set(items, { y: 30, opacity: 0 })
        gsap.to(items, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 90%", toggleActions: "play none none reverse" },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="relative py-24 pl-4 md:pl-24 pr-4 md:pr-10">
      <div ref={headerRef} className="mb-12">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">07 / Întrebări</span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">ÎNTREBĂRI FRECVENTE</h2>
        <p className="mt-3 max-w-xl font-mono text-[11px] text-muted-foreground leading-relaxed">
          Răspunsuri la cele mai frecvente întrebări despre produsele și serviciile Pure Harmony.
        </p>
      </div>

      <div ref={listRef} className="space-y-2 max-w-3xl">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>
    </section>
  )
}
