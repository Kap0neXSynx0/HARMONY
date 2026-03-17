import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { ShopSection } from "@/components/shop-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { PrinciplesSection } from "@/components/principles-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SideNav />

      <div className="relative z-10">
        <HeroSection />
        <SignalsSection />
        <WorkSection />
        <ShopSection />
        <TestimonialsSection />
        <StatsSection />
        <PrinciplesSection />
        <FAQSection />
        <CTASection />
        <ColophonSection />
      </div>
    </main>
  )
}
