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
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pl-4 md:pl-20 pr-4 md:pr-8">
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical label */}
      <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40 -rotate-90 origin-left block whitespace-nowrap">
          PURE HARMONY — 2026
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full max-w-xl">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="PURE HARMONY" speed={80} />
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-white/50 text-[clamp(0.8rem,2.5vw,1.6rem)] mt-2 tracking-wide">
          Creăm Armonie Prin Natură
        </h2>

        <p className="mt-5 max-w-md font-mono text-[10px] text-white/70 leading-relaxed">
          Pure Harmony S.R.L. oferă produse cosmetice naturale, realizate din ingrediente pure și ecologice.
          Misiunea noastră este să aducem armonie între om și natură prin produse sănătoase și sustenabile.
        </p>

        <p className="mt-2 max-w-md font-mono text-[9px] text-white/40 leading-relaxed">
          Fondată în 2026 — cosmetice naturale certificate organic, ambalate sustenabil, livrate în toată România.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <a
            href="#shop"
            className="group inline-flex items-center gap-2 bg-accent text-white px-5 py-2 font-mono text-[9px] uppercase tracking-widest hover:bg-accent/80 transition-all duration-200"
          >
            <ScrambleTextOnHover text="Vezi Produsele" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="#signals"
            className="inline-flex items-center bg-accent/20 border border-accent/40 text-accent px-5 py-2 font-mono text-[9px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-200"
          >
            Despre Noi
          </a>
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
        <div className="border border-white/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest text-white/30">
          S.R.L. / Produse Naturale / 2026
        </div>
      </div>
    </section>
  )
}
