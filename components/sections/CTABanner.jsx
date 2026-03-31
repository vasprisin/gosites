'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import { ctaBanner } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

export default function CTABanner() {
  return (
    <Section id="final-cta" className="pt-0">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <Card className="overflow-hidden border-sky-200 bg-gradient-to-r from-sky-50 via-white to-amber-50 px-8 py-10 sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <motion.div className="max-w-3xl space-y-3" variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Early Bird Offer
              </p>
              <h2 className="font-display text-3xl leading-tight tracking-[-0.05em] text-slate-950 sm:text-4xl">
                {ctaBanner.title}
              </h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button asChild>
                <a
                  href={ctaBanner.cta.href}
                  data-ph-event="cta_click"
                  data-ph-cta-label={ctaBanner.cta.label}
                  data-ph-cta-location="final_cta"
                  data-ph-cta-target={ctaBanner.cta.href}
                  data-ph-section="final_cta"
                >
                  {ctaBanner.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </Section>
  )
}
