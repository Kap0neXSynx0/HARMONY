"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const products = [
  { name: "Săpun Natural cu Lavandă", description: "Săpun artizanal cu ulei esențial de lavandă. Curăță delicat și hidratează pielea.", price: "25 lei", category: "Îngrijire Corp", badge: "Best Seller", ingredients: "Lavandă, Ulei de Cocos, Unt de Shea", image: "https://i.ibb.co/fdQzQSjb/S-pun-Natural-cu-202603171903.jpg" },
  { name: "Cremă Hidratantă cu Aloe", description: "Cremă de față cu aloe vera și vitamina E. Hidratare profundă pentru toate tipurile de ten.", price: "45 lei", category: "Îngrijire Față", badge: "Nou", ingredients: "Aloe Vera, Vitamina E, Acid Hialuronic", image: "https://i.ibb.co/DfYGzDvk/Crem-Hidratant-cu-202603171904.jpg" },
  { name: "Ulei Esențial de Mentă", description: "Ulei esențial pur de mentă, extras prin distilare cu aburi. Ideal pentru aromaterapie.", price: "35 lei", category: "Aromaterapie", badge: "Popular", ingredients: "Mentă Piperita, Extract Pur 100%", image: "https://i.ibb.co/KcBkrc02/Ulei-Esen-ial-de-202603171904-1.jpg" },
  { name: "Balsam de Buze Natural", description: "Balsam cu ceară de albine și unt de shea. Protecție și hidratare pe tot parcursul zilei.", price: "20 lei", category: "Îngrijire Buze", badge: "Eco", ingredients: "Ceară de Albine, Unt de Shea, Vanilie", image: "https://i.ibb.co/tMD3gH0t/Balsam-de-Buze-202603171904.jpg" },
  { name: "Șampon Organic cu Rozmarin", description: "Șampon natural cu rozmarin pentru păr sănătos. Fără sulfați și parabeni.", price: "40 lei", category: "Îngrijire Păr", badge: "Organic", ingredients: "Rozmarin, Biotină, Ulei de Argan", image: "https://i.ibb.co/CKcZXxBy/ampon-Organic-cu-202603171904.jpg" },
  { name: "Lumânare Aromată Eco", description: "Lumânare din ceară de soia cu uleiuri esențiale. Atmosferă relaxantă, ardere curată.", price: "55 lei", category: "Ambianță", badge: "Premium", ingredients: "Ceară de Soia, Eucalipt, Lavandă", image: "https://i.ibb.co/nMvpWBVT/Lum-nare-Aromat-Eco-202603171904.jpg" },
]

export function ShopSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 90%", toggleActions: "play none none reverse" },
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
    <section ref={sectionRef} id="shop" className="relative py-20 pl-4 md:pl-20 pr-4 md:pr-8">
      <div ref={headerRef} className="mb-10 flex items-end justify-between">
        <div>
          <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent">03 / Magazin</span>
          <h2 className="mt-2 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight text-white">PRODUSELE NOASTRE</h2>
          <p className="mt-2 max-w-sm font-mono text-[9px] text-white/50 leading-relaxed">
            Cosmetice naturale realizate manual, cu ingrediente organice certificate.
          </p>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-[9px] text-white/40 text-right leading-relaxed">
          Certificate organic. Livrare în toată România.
        </p>
      </div>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product, index }: { product: { name: string; description: string; price: string; category: string; badge: string; ingredients: string; image: string }; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className={cn(
        "group relative border border-white/8 flex flex-col justify-between transition-all duration-500 overflow-hidden min-h-[380px] bg-white/3 backdrop-blur-sm",
        isHovered && "border-accent/50 shadow-lg shadow-accent/5",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="bg-accent text-white font-mono text-[7px] uppercase tracking-widest px-2 py-0.5">{product.badge}</span>
      </div>
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden border-b border-white/8">
        <img src={product.image} alt={product.name} className={cn("w-full h-full object-cover transition-transform duration-700 ease-out", isHovered ? "scale-105" : "scale-100")} />
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="relative z-10">
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">{product.category}</span>
          <h3 className={cn("mt-1.5 font-[var(--font-bebas)] text-xl tracking-tight transition-colors duration-300", isHovered ? "text-accent" : "text-white")}>{product.name}</h3>
          <p className="mt-1.5 font-mono text-[8px] text-white/50 leading-relaxed">{product.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {product.ingredients.split(", ").map((ing, i) => (
              <span key={i} className="font-mono text-[7px] bg-accent/15 text-accent px-1.5 py-0.5 uppercase tracking-wider">{ing}</span>
            ))}
          </div>
        </div>
        <div className="relative z-10 mt-auto pt-3 flex items-center justify-between">
          <span className="font-[var(--font-bebas)] text-lg text-accent">{product.price}</span>
          <button className={cn(
            "font-mono text-[7px] uppercase tracking-widest px-3 py-1.5 transition-all duration-300",
            isHovered ? "bg-accent text-white" : "border border-white/15 text-white/50 hover:border-accent hover:text-accent",
          )}>Adaugă în Coș</button>
        </div>
      </div>
      <span className={cn("absolute top-3 right-3 font-mono text-[8px] transition-colors duration-300", isHovered ? "text-accent" : "text-white/15")}>{String(index + 1).padStart(2, "0")}</span>
      <div className={cn("absolute bottom-0 left-0 w-8 h-8 transition-all duration-500", isHovered ? "opacity-100" : "opacity-0")}>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent" />
        <div className="absolute bottom-0 left-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
