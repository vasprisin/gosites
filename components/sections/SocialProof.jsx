'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import { useMemo, useState } from 'react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { socialProof } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

function LogoTrack({ items, reverse = false }) {
  const track = [...items, ...items]

  return (
    <div className="overflow-hidden rounded-full border border-slate-200 bg-white">
      <motion.div
        className="flex w-max items-center gap-8 px-8 py-4"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function WebsiteCard({ item }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="aspect-[16/10] border-b border-slate-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_50%,#f8fafc_100%)] p-4">
        <div className="flex h-full flex-col rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Preview
            </span>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700">
              Live
            </span>
          </div>
          <div className="mt-4 grid flex-1 gap-3">
            <div className="h-10 rounded-2xl bg-slate-100" />
            <div className="grid flex-1 grid-cols-[1.2fr_0.8fr] gap-3">
              <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-white" />
              <div className="flex flex-col gap-3">
                <div className="h-14 rounded-3xl bg-slate-100" />
                <div className="h-14 rounded-3xl bg-amber-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="font-display text-2xl tracking-[-0.04em] text-slate-950">
            {item.title}
          </h3>
          <p className="text-sm leading-6 text-slate-600">{item.description}</p>
        </div>
        <Button asChild variant="secondary" className="mt-auto w-full">
          <a href={item.href}>
            Open Website
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </Card>
  )
}

export default function SocialProof() {
  const [paused, setPaused] = useState(false)
  const columns = useMemo(() => socialProof.testimonials, [])

  return (
    <Section id="results">
      <motion.div
        className="space-y-12"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div className="max-w-3xl" variants={fadeUp}>
          <Heading
            eyebrow={socialProof.eyebrow}
            title={socialProof.title}
            description="Client logos, website examples, and client feedback from projects designed to feel credible and convert attention into leads."
          />
        </motion.div>

        <div className="space-y-4">
          <LogoTrack items={socialProof.logos} />
          <LogoTrack items={[...socialProof.logos].reverse()} reverse />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {socialProof.websites.map((item) => (
            <motion.div key={item.title} variants={fadeUp} whileHover={{ y: -5 }}>
              <WebsiteCard item={item} />
            </motion.div>
          ))}
        </div>

        <div
          className="space-y-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-center justify-between gap-4">
            <Heading
              as="h3"
              size="md"
              title="What our Clients Say About Us"
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
            <motion.div
              className="flex w-max gap-4 p-4"
              animate={paused ? { x: 0 } : { x: ['0%', '-50%'] }}
              transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            >
              {[...columns, ...columns].map((item, index) => (
                <Card key={`${item.name}-${index}`} className="w-[20rem] shrink-0 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {item.company}
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-700">
                    “{item.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="flex justify-start">
          <Button asChild>
            <a
              href={socialProof.cta.href}
              data-ph-event="cta_click"
              data-ph-cta-label={socialProof.cta.label}
              data-ph-cta-location="social_proof"
              data-ph-cta-target={socialProof.cta.href}
              data-ph-section="results"
            >
              {socialProof.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </motion.div>
    </Section>
  )
}
