"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", label: "Acasă" },
  { id: "signals", label: "Despre" },
  { id: "work", label: "Proces" },
  { id: "shop", label: "Magazin" },
  { id: "testimonials", label: "Recenzii" },
  { id: "stats", label: "Impact" },
  { id: "principles", label: "Valori" },
  { id: "faq", label: "Întrebări" },
  { id: "cta", label: "Comunitate" },
  { id: "colophon", label: "Contact" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 },
    )
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-12 md:w-14 hidden md:flex flex-col justify-center border-r border-white/8 bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col gap-3 px-3">
        {navItems.map(({ id, label }) => (
          <button key={id} onClick={() => scrollToSection(id)} className="group relative flex items-center gap-2">
            <span className={cn(
              "h-1 w-1 rounded-full transition-all duration-300",
              activeSection === id ? "bg-accent scale-150" : "bg-white/20 group-hover:bg-white/50",
            )} />
            <span className={cn(
              "absolute left-4 font-mono text-[7px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-6 whitespace-nowrap",
              activeSection === id ? "text-accent" : "text-white/50",
            )}>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
