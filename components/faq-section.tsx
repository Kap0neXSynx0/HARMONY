"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "Ce ingrediente folosiți în produsele voastre?",
    answer: "Folosim exclusiv ingrediente naturale și organice certificate. Principalele ingrediente includ uleiuri esențiale, extract de aloe vera, ceară de albine, unt de shea, ulei de cocos și extracte vegetale. Toate ingredientele sunt listate pe ambalajul fiecărui produs și pe site-ul nostru.",
  },
  {
    question: "Produsele sunt testate pe animale?",
    answer: "Nu, absolut nu. Pure Harmony este un brand 100% cruelty-free. Nu testăm niciun produs sau ingredient pe animale, și nici nu colaborăm cu furnizori care practică testarea pe animale. Suntem certificați de organizații internaționale care garantează standardele noastre etice.",
  },
  {
    question: "Cum se face livrarea și care sunt costurile?",
    answer: "Livrăm în toată România prin curier eco-friendly. Comenzile peste 150 lei beneficiază de transport gratuit. Livrarea standard durează 2-4 zile lucrătoare. Toate produsele sunt ambalate în materiale reciclabile, minimizând impactul asupra mediului.",
  },
  {
    question: "Pot returna un produs dacă nu sunt mulțumit?",
    answer: "Da, oferim o garanție de satisfacție de 30 de zile. Dacă produsul nu corespunde așteptărilor tale, poți solicita returnarea sau înlocuirea acestuia. Contactează echipa noastră de suport prin email sau telefon pentru a iniția procesul de retur.",
  },
  {
    question: "Produsele au termen de valabilitate?",
    answer: "Da, ca toate produsele naturale, cosmeticele noastre au termen de valabilitate. Acesta variază între 6 și 18 luni, în funcție de produs. Data expirării este afișată clar pe fiecare ambalaj. Recomandăm depozitarea la temperatură ambiantă, ferită de lumina directă a soarelui.",
  },
  {
    question: "Aveți produse potrivite pentru piele sensibilă?",
    answer: "Absolut! Majoritatea produselor noastre sunt formulate special pentru a fi blânde cu pielea sensibilă. Crema Hidratantă cu Aloe și Balsamul de Buze Natural sunt deosebit de recomandate persoanelor cu piele sensibilă. Recomandăm întotdeauna testarea pe o zonă mică a pielii înainte de utilizare.",
  },
  {
    question: "Cum vă mențineți prețurile accesibile?",
    answer: "Colaborăm direct cu producătorii de ingrediente naturale, eliminând intermediarii. De asemenea, optimizăm procesele de producție și distribuție pentru a menține prețuri corecte. Credem că produsele naturale de calitate ar trebui să fie accesibile tuturor, nu doar un lux.",
  },
  {
    question: "Oferiți și abonamente sau pachete de produse?",
    answer: "Da! Oferim pachete speciale și abonamente lunare cu reduceri de până la 20%. Pachetele sunt personalizabile — poți alege combinația de produse care ți se potrivește. Abonamentele pot fi anulate oricând, fără obligații suplimentare.",
  },
]

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const answerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!answerRef.current) return
    if (isOpen) {
      gsap.to(answerRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      })
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      })
    }
  }, [isOpen])

  return (
    <article
      className={cn(
        "border border-border/40 bg-white/50 backdrop-blur-sm transition-all duration-300",
        isOpen && "border-accent/40 shadow-md",
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 md:p-8 flex items-start justify-between gap-4 text-left"
      >
        <div className="flex items-start gap-4">
          <span className="font-mono text-[11px] text-accent mt-1 flex-shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight transition-colors duration-300",
              isOpen ? "text-accent" : "text-foreground",
            )}
          >
            {faq.question}
          </h3>
        </div>
        <span
          className={cn(
            "font-mono text-2xl text-muted-foreground transition-transform duration-300 flex-shrink-0",
            isOpen && "rotate-45",
          )}
        >
          +
        </span>
      </button>
      <div ref={answerRef} className="overflow-hidden h-0 opacity-0">
        <div className="px-6 md:px-8 pb-6 md:pb-8 pl-12 md:pl-16">
          <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed max-w-3xl">
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

      const items = listRef.current?.querySelectorAll("article")
      if (items && items.length > 0) {
        gsap.set(items, { y: 30, opacity: 0 })
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">07 / Întrebări</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">ÎNTREBĂRI FRECVENTE</h2>
        <p className="mt-4 max-w-2xl font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
          Aici găsești răspunsuri la cele mai frecvente întrebări despre produsele, ingredientele și
          serviciile Pure Harmony. Nu ai găsit ce cauți? Contactează-ne oricând.
        </p>
      </div>

      {/* FAQ list */}
      <div ref={listRef} className="space-y-3 max-w-4xl">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} index={index} />
        ))}
      </div>
    </section>
  )
}
