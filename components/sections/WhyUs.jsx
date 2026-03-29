'use client'

import { motion } from 'framer-motion'
import { Clock3, PoundSterling, ShieldCheck, Sparkles } from 'lucide-react'

import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { whyUs } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

const iconMap = {
  clock: Clock3,
  price: PoundSterling,
  design: Sparkles,
  business: ShieldCheck,
}

export default function WhyUs() {
  return (
    <Section>
      <motion.div
        className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-14"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp}>
          <Heading
            eyebrow="Why GoSites"
            title="Fast, modern, and brutally simple"
            description="Most website projects get dragged down by bad communication, endless revisions, and overcomplicated process. We do the opposite."
          />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {whyUs.map((item) => {
            const Icon = iconMap[item.icon]

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="h-full p-7 transition-colors duration-300 hover:border-slate-300 hover:bg-slate-50">
                  <div className="space-y-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-3">
                      <h3 className="font-display text-xl tracking-[-0.03em] text-slate-950">
                        {item.title}
                      </h3>
                      <p className="text-base leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </Section>
  )
}
