"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    name: "Săpun Natural cu Lavandă",
    description: "Săpun artizanal realizat cu ulei esențial de lavandă și ingrediente organice. Curăță delicat și hidratează pielea.",
    price: "25 lei",
    category: "Îngrijire Corp",
  },
  {
    name: "Cremă Hidratantă cu Aloe",
    description: "Cremă de față cu extract de aloe vera și vitamina E. Hidratare profundă pentru toate tipurile de ten.",
    price: "45 lei",
    category: "Îngrijire Față",
  },
  {
    name: "Ulei Esențial de Mentă",
    description: "Ulei esențial pur de mentă, extras prin distilare cu aburi. Ideal pentru aromaterapie și relaxare.",
    price: "35 lei",
    category: "Aromaterapie",
  },
  {
    name: "Balsam de Buze Natural",
    description: "Balsam de buze cu ceară de albine și unt de shea. Protecție și hidratare pe tot parcursul zilei.",
    price: "20 lei",
    category: "Îngrijire Buze",
  },
  {
    name: "Șampon Organic cu Rozmarin",
    description: "Șampon natural cu extract de rozmarin pentru păr sănătos și strălucitor. Fără sulfați și parabeni.",
    price: "40 lei",
    category: "Îngrijire Păr",
  },
  {
    name: "Lumânare Aromată Eco",
    description: "Lumânare din ceară de soia cu uleiuri esențiale naturale. Creează o atmosferă relaxantă în casa ta.",
    price: "55 lei",
    category: "Ambianță",
  },
]

export function ShopSection() {
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
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
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
    <section ref={sectionRef} id="shop" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Magazin</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">PRODUSELE NOASTRE</h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Produse cosmetice naturale, realizate cu ingrediente organice certificate.
        </p>
      </div>

      {/* Products grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({
  product,
  index,
}: {
  product: {
    name: string
    description: string
    price: string
    category: string
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className={cn(
        "group relative border border-border/40 p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden min-h-[280px]",
        isHovered && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Top content */}
      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {product.category}
        </span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] text-3xl tracking-tight transition-colors duration-300",
            isHovered ? "text-accent" : "text-foreground",
          )}
        >
          {product.name}
        </h3>

        <p className="mt-4 font-mono text-xs text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Bottom: price + button */}
      <div className="relative z-10 mt-6 flex items-center justify-between">
        <span className="font-[var(--font-bebas)] text-2xl text-accent">
          {product.price}
        </span>

        <button
          className={cn(
            "font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-300",
            isHovered
              ? "border-accent bg-accent text-white"
              : "border-border text-muted-foreground hover:border-accent hover:text-accent",
          )}
        >
          Adaugă în Coș
        </button>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute top-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isHovered ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-12 h-12 transition-all duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent" />
        <div className="absolute bottom-0 left-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
