'use client'

import { motion } from 'framer-motion'

import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { whyDifferent } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

export default function WhyDifferent() {
  return (
    <Section id="why-different">
      <motion.div
        className="mx-auto max-w-5xl space-y-10 text-center"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div className="space-y-8" variants={fadeUp}>
          <Heading
            align="center"
            eyebrow={whyDifferent.eyebrow}
            title={whyDifferent.title}
            description={whyDifferent.subheading}
            className="items-center"
          />

          <div className="space-y-5">
            {whyDifferent.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mx-auto max-w-4xl text-base leading-8 text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div className="space-y-6" variants={fadeUp}>
          <div className="mx-auto max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Key Numbers
            </p>
            <div className="flex flex-wrap items-start justify-center gap-8">
              {whyDifferent.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-[10rem] text-center"
                >
                  <div className="inline-flex rounded-2xl border border-slate-300 px-5 py-3">
                    <p className="font-display text-2xl tracking-[-0.05em] text-slate-950">
                      {stat.value}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild>
              <a href={whyDifferent.cta.href}>{whyDifferent.cta.label}</a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}
