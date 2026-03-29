'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { howWeWork } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

export default function HowWeWork() {
  return (
    <Section id="how-we-work">
      <motion.div
        className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div className="space-y-10" variants={fadeUp}>
          <Heading
            eyebrow={howWeWork.eyebrow}
            title={howWeWork.title}
            description={howWeWork.subtitle}
          />

          <div className="grid gap-5">
            {howWeWork.items.map((item, index) => (
              <Card key={item.title} className="p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    0{index + 1}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-sky-300/80 to-transparent" />
                </div>
                <h3 className="font-display text-2xl tracking-[-0.04em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          <Button asChild>
            <a href={howWeWork.cta.href}>
              {howWeWork.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card className="sticky top-28 overflow-hidden p-0">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Graphic
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_35%),linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)]">
              <div className="absolute inset-6 rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-6 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.2)]">
                <div className="space-y-4">
                  <div className="h-4 w-28 rounded-full bg-slate-200" />
                  <div className="h-52 rounded-[1.5rem] bg-gradient-to-br from-sky-100 to-white" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="h-16 rounded-2xl bg-slate-100" />
                    <div className="h-16 rounded-2xl bg-amber-50" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-sky-200 bg-white px-5 py-4 shadow-[0_24px_80px_-56px_rgba(37,99,235,0.2)]">
                <p className="text-sm font-semibold text-slate-950">
                  Right-side graphic placeholder
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Swap this out for the workflow graphic the user will provide.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  )
}
