'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { capturePostHogEvent } from '@/lib/posthog'
import { faqs, getStarted } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

export default function FAQ() {
  const midpoint = Math.ceil(faqs.length / 2)
  const columns = [faqs.slice(0, midpoint), faqs.slice(midpoint)]

  function handleAccordionChange(value, items, columnIndex) {
    if (!value) {
      return
    }

    const itemIndex = Number(value.split('-').at(-1))
    const item = items[itemIndex]

    if (!item) {
      return
    }

    capturePostHogEvent('faq_expand', {
      faq_column: columnIndex + 1,
      faq_position: faqs.findIndex(({ question }) => question === item.question) + 1,
      faq_question: item.question,
      section: 'faq',
    })
  }

  return (
    <Section id="faq">
      <motion.div
        className="space-y-10"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div className="mx-auto max-w-3xl text-center" variants={fadeUp}>
          <Heading
            align="center"
            eyebrow="FAQ"
            title="Get your questions answered."
            description="What you can expect from us."
            titleClassName="text-center"
            descriptionClassName="mx-auto text-center"
          />
        </motion.div>

        <motion.div className="grid gap-6 lg:grid-cols-2" variants={fadeUp}>
          {columns.map((items, columnIndex) => (
            <div key={`faq-column-${columnIndex}`} className="space-y-3">
              <Accordion.Root
                type="single"
                collapsible
                className="space-y-3"
                onValueChange={(value) =>
                  handleAccordionChange(value, items, columnIndex)
                }
              >
                {items.map((item, index) => (
                  <Accordion.Item
                    key={item.question}
                    value={`item-${columnIndex}-${index}`}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 px-5 transition-colors duration-300 hover:border-slate-300 hover:bg-white"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left">
                        <span className="font-display text-lg tracking-[-0.03em] text-slate-950">
                          {item.question}
                        </span>
                        <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden pb-5 text-base leading-7 text-slate-600">
                      {item.answer}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          ))}
        </motion.div>

        <motion.div className="flex justify-center" variants={fadeUp}>
          <Button asChild size="lg">
            <a
              href={getStarted.primaryCta.href}
              data-ph-event="cta_click"
              data-ph-cta-label={getStarted.primaryCta.label}
              data-ph-cta-location="faq_footer"
              data-ph-cta-target={getStarted.primaryCta.href}
              data-ph-section="faq"
            >
              {getStarted.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}
