'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import EnquiryForm from '@/components/sections/EnquiryForm'
import { hero } from '@/lib/content'
import { fadeUp, scaleIn, staggerParent, viewport } from '@/lib/motion'

export default function Hero() {
  return (
    <Section id="hero" className="pb-20 pt-16 sm:pt-20 lg:pt-24">
      <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-14">
        <motion.div
          className="flex flex-col gap-10"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <div className="space-y-4">
              <p className="inline-flex rounded-full border border-slate-950 bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                {hero.eyebrow}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex -space-x-3">
                  {headshots.map((headshot, index) => (
                    <img
                      key={headshot.src}
                      src={headshot.src}
                      alt={headshot.alt}
                      className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] sm:h-12 sm:w-12"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                    <span className="flex items-center gap-0.5 text-emerald-500">
                      {Array.from({ length: hero.trustpilot.avatarCount }).map((_, index) => (
                        <Star
                          key={`star-${index}`}
                          className="h-4 w-4 fill-emerald-500 text-emerald-500"
                        />
                      ))}
                    </span>
                    {hero.trustpilot.ratingLabel}
                  </span>
                  <span className="text-sm text-slate-600">
                    {hero.trustpilot.proofLine}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-blue-700 sm:mb-6">
              {hero.subtitle}
            </p>
            <Heading
              as="h1"
              size="hero"
              title={hero.title}
              description={hero.description}
              titleClassName="max-w-4xl text-[2.9rem] leading-[0.9] sm:text-[3.6rem] lg:text-[4.35rem]"
              descriptionClassName="max-w-2xl"
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            variants={fadeUp}
          >
            <Button asChild size="lg">
              <a
                href={hero.primaryCta.href}
                data-ph-event="cta_click"
                data-ph-cta-label={hero.primaryCta.label}
                data-ph-cta-location="hero_primary"
                data-ph-cta-target={hero.primaryCta.href}
                data-ph-section="hero"
              >
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a
                href={hero.secondaryCta.href}
                data-ph-event="cta_click"
                data-ph-cta-label={hero.secondaryCta.label}
                data-ph-cta-location="hero_secondary"
                data-ph-cta-target={hero.secondaryCta.href}
                data-ph-section="hero"
              >
                {hero.secondaryCta.label}
              </a>
            </Button>
          </motion.div>

          <motion.p
            className="max-w-2xl text-sm text-slate-500 sm:text-base"
            variants={fadeUp}
          >
            We pair fast turnaround with a clear process so you can get a website that looks the part without the usual agency drag.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative lg:pt-6"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerParent}
        >
          <motion.div
            className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-sky-400/18 blur-3xl"
            animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl"
            animate={{ y: [0, 16, 0], x: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />

          <Card
            tone="accent"
            className="relative overflow-hidden border-sky-200 p-6 sm:p-8"
          >
            <motion.div
              className="pointer-events-none absolute inset-y-0 left-[-20%] w-[40%] bg-gradient-to-r from-transparent via-sky-200/35 to-transparent"
              animate={{ x: ['-120%', '320%'] }}
              transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" />
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-bold uppercase tracking-[0.22em] text-slate-950 sm:text-lg">
                  Service Request Form
                </p>
                <p className="mt-1 text-sm font-medium text-slate-950 sm:text-base">
                  Tell us a bit about your project and we’ll guide the next step.
                </p>
              </div>
            </div>
            <motion.div variants={scaleIn}>
              <EnquiryForm />
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}

const headshots = [
  {
    src: 'https://images.pexels.com/photos/30004320/pexels-photo-30004320.jpeg?auto=compress&cs=tinysrgb&w=240&h=240&dpr=2',
    alt: 'Professional woman smiling in a studio portrait',
  },
  {
    src: 'https://images.pexels.com/photos/30004315/pexels-photo-30004315.jpeg?auto=compress&cs=tinysrgb&w=240&h=240&dpr=2',
    alt: 'Professional businessman headshot in a suit',
  },
  {
    src: 'https://images.pexels.com/photos/30975982/pexels-photo-30975982.jpeg?auto=compress&cs=tinysrgb&w=240&h=240&dpr=2',
    alt: 'Confident businessman portrait with glasses',
  },
  {
    src: 'https://images.pexels.com/photos/33261949/pexels-photo-33261949.jpeg?auto=compress&cs=tinysrgb&w=240&h=240&dpr=2',
    alt: 'Professional young man studio portrait',
  },
  {
    src: 'https://images.pexels.com/photos/32064778/pexels-photo-32064778.jpeg?auto=compress&cs=tinysrgb&w=240&h=240&dpr=2',
    alt: 'Professional headshot of businessman in a suit',
  },
]
