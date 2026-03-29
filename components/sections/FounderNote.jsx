'use client'

import { motion } from 'framer-motion'

import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { founderNote } from '@/lib/content'
import { fadeUp, scaleIn, staggerParent, viewport } from '@/lib/motion'

export default function FounderNote() {
  return (
    <Section id="founder">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <Card className="grid gap-0 overflow-hidden p-0 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
          <motion.div
            className="min-h-[22rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_40%),linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-6 sm:p-8"
            variants={scaleIn}
          >
            <div className="flex h-full items-end">
              <div className="w-full rounded-[1.75rem] border border-dashed border-slate-300 bg-white/80 p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.25)]">
                <div className="flex aspect-[4/5] items-center justify-center rounded-[1.25rem] border border-slate-200 bg-slate-50 text-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {founderNote.imageLabel}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Drop in the founder portrait when ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center p-8 sm:p-10"
            variants={fadeUp}
          >
            <Heading
              eyebrow={founderNote.eyebrow}
              title={founderNote.title}
              description={founderNote.quote}
            />
            <div className="mt-8 space-y-1">
              <p className="font-display text-2xl tracking-[-0.04em] text-slate-950">
                {founderNote.name}
              </p>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                {founderNote.role}
              </p>
              <p className="text-lg font-semibold tracking-[-0.02em] text-slate-700">
                {founderNote.company}
              </p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </Section>
  )
}
