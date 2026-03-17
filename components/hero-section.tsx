"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pl-4 md:pl-24 pr-4 md:pr-10">
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical labels */}
      <div className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          PURE HARMONY — 2026
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full max-w-2xl">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="PURE HARMONY" speed={80} />
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-muted-foreground/70 text-[clamp(1rem,3vw,2rem)] mt-3 tracking-wide">
          Creăm Armonie Prin Natură
        </h2>

        <p className="mt-6 max-w-lg font-mono text-xs text-foreground/80 leading-relaxed">
          Pure Harmony S.R.L. oferă produse cosmetice naturale, realizate din ingrediente pure și ecologice.
          Misiunea noastră este să aducem armonie între om și natură prin produse sănătoase și sustenabile.
          Fiecare produs este creat cu grijă, respect pentru mediu și pasiune pentru frumusețea naturală.
        </p>

        <p className="mt-3 max-w-lg font-mono text-[11px] text-muted-foreground leading-relaxed">
          Fondată în 2026, compania noastră aduce pe piața din România o gamă completă de cosmetice naturale —
          de la săpunuri artizanale și creme hidratante, până la uleiuri esențiale și lumânări aromate eco.
          Toate produsele sunt certificate organic și ambalate sustenabil.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <a
            href="#shop"
            className="group inline-flex items-center gap-2 border border-foreground/20 px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="Vezi Produsele" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="#signals"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Despre Noi
          </a>
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
        <div className="border border-border/40 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          S.R.L. / Produse Naturale / 2026
        </div>
      </div>
    </section>
  )
}
