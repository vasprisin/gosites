'use client'

import { motion } from 'framer-motion'
import { Bot, MapPinned, Search, Smartphone } from 'lucide-react'

import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import { trustStrip } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

const iconMap = {
  map: MapPinned,
  search: Search,
  mobile: Smartphone,
  bot: Bot,
}

export default function TrustStrip() {
  return (
    <Section className="pt-0">
      <motion.div
        className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-end xl:gap-12">
          <motion.div className="space-y-4 xl:max-w-[34rem]" variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {trustStrip.label}
            </p>
            <p className="max-w-[16ch] font-display text-3xl leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-4xl">
              {trustStrip.text}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustStrip.pills.map((pill) => {
              const Icon = iconMap[pill.icon]

              return (
                <motion.div key={pill.title} variants={fadeUp}>
                  <Card
                    tone="muted"
                    className="flex h-full items-center gap-4 rounded-[1.6rem] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <span className="block text-base font-medium tracking-[-0.02em] text-slate-900">
                        {pill.title}
                      </span>
                      <span className="block text-sm text-slate-600">
                        {pill.icon === 'map' && 'Built around London businesses first.'}
                        {pill.icon === 'search' && 'Structured cleanly for search visibility.'}
                        {pill.icon === 'mobile' && 'Designed to feel sharp on every screen.'}
                        {pill.icon === 'bot' && 'Faster workflow, still guided properly.'}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
