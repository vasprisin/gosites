import LandingAnalytics from '@/components/analytics/LandingAnalytics'
import CTABanner from '@/components/sections/CTABanner'
import ContactSection from '@/components/sections/ContactSection'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'
import FounderNote from '@/components/sections/FounderNote'
import GalleryProof from '@/components/sections/GalleryProof'
import GetStarted from '@/components/sections/GetStarted'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import HowWeWork from '@/components/sections/HowWeWork'
import Pricing from '@/components/sections/Pricing'
import SocialProof from '@/components/sections/SocialProof'
import TopBanner from '@/components/sections/TopBanner'
import VSL from '@/components/sections/VSL'
import WhyDifferent from '@/components/sections/WhyDifferent'

export default function Page() {
  return (
    <div className="relative isolate overflow-x-hidden">
      <LandingAnalytics />
      <div className="pointer-events-none absolute inset-x-0 top-[-12rem] -z-10 h-[44rem] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_38%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[24rem] -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-sky-200/60 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-6rem] top-[64rem] -z-10 h-[22rem] w-[22rem] rounded-full bg-amber-200/50 blur-[120px]" />
      <TopBanner />
      <Header />
      <main>
        <Hero />
        <VSL />
        <SocialProof />
        <GetStarted />
        <Pricing />
        <FAQ />
        <WhyDifferent />
        <HowWeWork />
        <FounderNote />
        <GalleryProof />
        <ContactSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
