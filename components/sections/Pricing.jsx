'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { pricingSection } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

export default function Pricing() {
  return (
    <Section id="pricing">
      <motion.div
        className="space-y-12"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp}>
          <Heading
            eyebrow={pricingSection.eyebrow}
            title={pricingSection.title}
            description="Launch pricing is limited. Once the first 25 customers are taken, the offer changes."
          />
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-3">
          {pricingSection.plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                tone={plan.featured ? 'accent' : 'default'}
                className={`relative flex h-full flex-col overflow-hidden p-8 transition-colors duration-300 ${
                  plan.featured
                    ? 'border-sky-300 shadow-[0_34px_110px_-60px_rgba(37,99,235,0.28)]'
                    : 'hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {plan.featured ? (
                  <div className="absolute right-5 top-5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Best value
                  </div>
                ) : null}

                <div className="flex min-h-full flex-col">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Plan
                      </p>
                      <h3 className="mt-3 font-display text-2xl tracking-[-0.04em] text-slate-950">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-base leading-7 text-slate-600">{plan.subtitle}</p>
                    <p className="text-sm font-medium text-slate-500">
                      Best for: {plan.bestFor}
                    </p>
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-slate-300 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Pricing
                    </p>
                    <div className="mt-3 flex items-end gap-3">
                      {plan.regularPrice === 'Custom' ? (
                        <span className="font-display text-5xl tracking-[-0.06em] text-slate-950">
                          {plan.launchPrice}
                        </span>
                      ) : (
                        <>
                          <span className="font-display text-4xl tracking-[-0.06em] text-slate-400 line-through">
                            {plan.regularPrice}
                          </span>
                          <span className="font-display text-5xl tracking-[-0.06em] text-slate-950">
                            {plan.launchPrice}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 space-y-6">
                    {plan.sections.map((section) => (
                      <div key={section.title} className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          {section.title}
                        </h4>
                        <div className="space-y-3">
                          {section.items.map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-50">
                                <Check className="h-3.5 w-3.5 text-sky-600" />
                              </span>
                              <span className="text-sm leading-6 text-slate-600">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <Button asChild size="lg" className="w-full">
                      <a
                        href={plan.cta.href}
                        data-ph-event="cta_click"
                        data-ph-cta-label={plan.cta.label}
                        data-ph-cta-location={`pricing_${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        data-ph-cta-target={plan.cta.href}
                        data-ph-plan-name={plan.name}
                        data-ph-section="pricing"
                      >
                        {plan.cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}
