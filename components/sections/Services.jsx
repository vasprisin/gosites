'use client'

import { motion } from 'framer-motion'

import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { services } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

export default function Services() {
  return (
    <Section id="services">
      <motion.div
        className="space-y-12"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp}>
          <Heading
            eyebrow="What we do"
            title="Everything you need to launch a website properly"
            description="We keep the offer simple: modern websites that look sharp, load fast, and give your business a serious online presence."
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="group relative h-full overflow-hidden p-8 transition-colors duration-300 hover:border-slate-300 hover:bg-slate-50">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-4 top-5 bottom-5 flex items-center font-display text-[7rem] leading-none tracking-[-0.08em] text-slate-200/80 sm:right-5 sm:text-[8.5rem] lg:text-[9.5rem]">
                  <span className="[writing-mode:vertical-rl] [text-orientation:mixed]">
                    {service.number}
                  </span>
                </span>
                <div className="flex h-full flex-col gap-8">
                  <div className="flex items-center justify-end gap-4">
                    <span className="h-px w-16 bg-gradient-to-r from-sky-300/90 to-transparent" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    <h3 className="font-display text-2xl tracking-[-0.04em] text-slate-950">
                      {service.title}
                    </h3>
                    <p className="max-w-xl text-base leading-7 text-slate-600">
                      {service.description}
                    </p>
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
