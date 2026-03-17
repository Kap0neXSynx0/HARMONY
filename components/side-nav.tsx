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
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-14 md:w-16 hidden md:flex flex-col justify-center border-r border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col gap-3 px-3">
        {navItems.map(({ id, label }) => (
          <button key={id} onClick={() => scrollToSection(id)} className="group relative flex items-center gap-2">
            <span
              className={cn(
                "h-1 w-1 rounded-full transition-all duration-300",
                activeSection === id ? "bg-accent scale-125" : "bg-muted-foreground/40 group-hover:bg-foreground/60",
              )}
            />
            <span
              className={cn(
                "absolute left-5 font-mono text-[8px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-7 whitespace-nowrap",
                activeSection === id ? "text-accent" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
