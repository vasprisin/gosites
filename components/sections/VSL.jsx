'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { vslSection } from '@/lib/content'
import { fadeUp, scaleIn, staggerParent, viewport } from '@/lib/motion'

export default function VSL() {
  const hasEmbed = Boolean(vslSection.embedUrl)

  return (
    <Section id="vsl">
      <motion.div
        className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div className="space-y-6" variants={fadeUp}>
          <Heading
            eyebrow={vslSection.eyebrow}
            title={vslSection.title}
            description={vslSection.description}
          />
          <Button asChild>
            <a
              href={vslSection.cta.href}
              data-ph-event="cta_click"
              data-ph-cta-label={vslSection.cta.label}
              data-ph-cta-location="vsl"
              data-ph-cta-target={vslSection.cta.href}
              data-ph-section="vsl"
            >
              {vslSection.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div variants={scaleIn}>
          <Card className="overflow-hidden p-0">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {vslSection.embedTitle}
            </p>
          </div>
          {hasEmbed ? (
            <div className="aspect-video">
              <iframe
                title={vslSection.embedTitle}
                src={vslSection.embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_40%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-blue-200 bg-white shadow-[0_24px_70px_-40px_rgba(37,99,235,0.45)]">
                  <Play className="h-8 w-8 fill-blue-600 text-blue-600" />
                </div>
              </div>
            </div>
          )}
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  )
}
