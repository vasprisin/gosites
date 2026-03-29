'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { getStarted } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

export default function GetStarted() {
  return (
    <Section id="get-started">
      <motion.div
        className="space-y-12"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp}>
          <Heading
            eyebrow={getStarted.eyebrow}
            title={getStarted.title}
            description="A clear path from first click to first draft, with two ways to enter the process."
          />
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent lg:block" />
          <div className="grid gap-6 lg:grid-cols-3">
            {getStarted.steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="relative h-full p-8">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                      Step {step.number}
                    </span>
                    {index < getStarted.steps.length - 1 ? (
                      <ArrowRight className="hidden h-5 w-5 text-blue-500 lg:block" />
                    ) : null}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl tracking-[-0.04em] text-slate-950">
                      {step.title}
                    </h3>
                    <p className="text-base leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={getStarted.primaryCta.href}>
              {getStarted.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={getStarted.secondaryCta.href}>{getStarted.secondaryCta.label}</a>
          </Button>
        </div>
      </motion.div>
    </Section>
  )
}
