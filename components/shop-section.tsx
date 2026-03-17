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
    badge: "Best Seller",
    ingredients: "Lavandă, Ulei de Cocos, Unt de Shea",
    image: "https://i.ibb.co/fdQzQSjb/S-pun-Natural-cu-202603171903.jpg"
  },
  {
    name: "Cremă Hidratantă cu Aloe",
    description: "Cremă de față cu extract de aloe vera și vitamina E. Hidratare profundă pentru toate tipurile de ten.",
    price: "45 lei",
    category: "Îngrijire Față",
    badge: "Nou",
    ingredients: "Aloe Vera, Vitamina E, Acid Hialuronic",
    image: "https://i.ibb.co/DfYGzDvk/Crem-Hidratant-cu-202603171904.jpg"
  },
  {
    name: "Ulei Esențial de Mentă",
    description: "Ulei esențial pur de mentă, extras prin distilare cu aburi. Ideal pentru aromaterapie și relaxare.",
    price: "35 lei",
    category: "Aromaterapie",
    badge: "Popular",
    ingredients: "Mentă Piperita, Extract Pur 100%",
    image: "https://i.ibb.co/KcBkrc02/Ulei-Esen-ial-de-202603171904-1.jpg"
  },
  {
    name: "Balsam de Buze Natural",
    description: "Balsam de buze cu ceară de albine și unt de shea. Protecție și hidratare pe tot parcursul zilei.",
    price: "20 lei",
    category: "Îngrijire Buze",
    badge: "Eco",
    ingredients: "Ceară de Albine, Unt de Shea, Vanilie",
    image: "https://i.ibb.co/tMD3gH0t/Balsam-de-Buze-202603171904.jpg"
  },
  {
    name: "Șampon Organic cu Rozmarin",
    description: "Șampon natural cu extract de rozmarin pentru păr sănătos și strălucitor. Fără sulfați și parabeni.",
    price: "40 lei",
    category: "Îngrijire Păr",
    badge: "Organic",
    ingredients: "Rozmarin, Biotină, Ulei de Argan",
    image: "https://i.ibb.co/CKcZXxBy/ampon-Organic-cu-202603171904.jpg"
  },
  {
    name: "Lumânare Aromată Eco",
    description: "Lumânare din ceară de soia cu uleiuri esențiale naturale. Creează o atmosferă relaxantă în casa ta.",
    price: "55 lei",
    category: "Ambianță",
    badge: "Premium",
    ingredients: "Ceară de Soia, Eucalipt, Lavandă",
    image: "https://i.ibb.co/nMvpWBVT/Lum-nare-Aromat-Eco-202603171904.jpg"
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
    <section ref={sectionRef} id="shop" className="relative py-24 pl-4 md:pl-24 pr-4 md:pr-10">
      {/* Section header */}
      <div ref={headerRef} className="mb-12 flex items-end justify-between">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">03 / Magazin</span>
          <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">PRODUSELE NOASTRE</h2>
          <p className="mt-3 max-w-md font-mono text-[11px] text-muted-foreground leading-relaxed">
            Descoperă gama noastră completă de produse cosmetice naturale. Fiecare produs este realizat manual,
            cu ingrediente organice certificate și ambalaje 100% reciclabile.
          </p>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-[11px] text-muted-foreground text-right leading-relaxed">
          Produse cosmetice naturale, certificate organic. Livrare în toată România.
        </p>
      </div>

      {/* Products grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    badge: string
    ingredients: string
    image: string
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className={cn(
        "group relative border border-border/40 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden min-h-[420px] bg-white/40 backdrop-blur-sm",
        isHovered && "border-accent/60 shadow-lg",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="bg-accent text-white font-mono text-[8px] uppercase tracking-widest px-2 py-0.5">
          {product.badge}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-white/80 border-b border-border/40">
        <img 
          src={product.image} 
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-out",
            isHovered ? "scale-105" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="relative z-10">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            {product.category}
          </span>
          <h3
            className={cn(
              "mt-2 font-[var(--font-bebas)] text-2xl tracking-tight transition-colors duration-300",
              isHovered ? "text-accent" : "text-foreground",
            )}
          >
            {product.name}
          </h3>

          <p className="mt-2 font-mono text-[10px] text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Ingredients */}
          <div className="mt-2 flex flex-wrap gap-1">
            {product.ingredients.split(", ").map((ing, i) => (
              <span key={i} className="font-mono text-[8px] bg-accent/10 text-accent px-1.5 py-0.5 uppercase tracking-wider">
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: price + button */}
        <div className="relative z-10 mt-auto pt-4 flex items-center justify-between">
          <span className="font-[var(--font-bebas)] text-xl text-accent">
            {product.price}
          </span>

          <button
            className={cn(
              "font-mono text-[8px] uppercase tracking-widest px-3 py-1.5 border transition-all duration-300",
              isHovered
                ? "border-accent bg-accent text-white"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent",
            )}
          >
            Adaugă în Coș
          </button>
        </div>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute top-3 right-3 font-mono text-[9px] transition-colors duration-300",
          isHovered ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-10 h-10 transition-all duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent" />
        <div className="absolute bottom-0 left-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
