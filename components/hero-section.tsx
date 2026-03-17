"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
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
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12">
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical labels */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          PURE HARMONY — 2026
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full">
        <div className="bg-white/50 backdrop-blur-sm border border-border/20 p-8 md:p-12 max-w-3xl">
          <SplitFlapAudioProvider>
            <div className="relative">
              <SplitFlapText text="PURE HARMONY" speed={80} />
              <div className="mt-4">
                <SplitFlapMuteToggle />
              </div>
            </div>
          </SplitFlapAudioProvider>

          <h2 className="font-[var(--font-bebas)] text-muted-foreground/70 text-[clamp(1.2rem,3.5vw,2.4rem)] mt-4 tracking-wide">
            Creăm Armonie Prin Natură
          </h2>

          <p className="mt-8 max-w-xl font-mono text-sm md:text-base text-foreground/80 leading-relaxed">
            Pure Harmony S.R.L. oferă produse cosmetice naturale, realizate din ingrediente pure și ecologice.
            Misiunea noastră este să aducem armonie între om și natură prin produse sănătoase și sustenabile.
            Fiecare produs este creat cu grijă, respect pentru mediu și pasiune pentru frumusețea naturală.
          </p>

          <p className="mt-4 max-w-xl font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
            Fondată în 2026, compania noastră aduce pe piața din România o gamă completă de cosmetice naturale —
            de la săpunuri artizanale și creme hidratante, până la uleiuri esențiale și lumânări aromate eco.
            Toate produsele sunt certificate organic și ambalate sustenabil.
          </p>

          <div className="mt-12 flex items-center gap-8">
            <a
              href="#shop"
              className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
            >
              <ScrambleTextOnHover text="Vezi Produsele" as="span" duration={0.6} />
              <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
            </a>
            <a
              href="#signals"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Despre Noi
            </a>
          </div>
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="border border-border bg-white/60 backdrop-blur-sm px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          S.R.L. / Produse Naturale / 2026
        </div>
      </div>
    </section>
  )
}
