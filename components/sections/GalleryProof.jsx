'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { galleryProof } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

export default function GalleryProof() {
  return (
    <Section id="gallery">
      <motion.div
        className="space-y-12"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp}>
          <Heading
            eyebrow={galleryProof.eyebrow}
            title={galleryProof.title}
            description={galleryProof.description}
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {galleryProof.items.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="overflow-hidden p-0">
                <div className="aspect-[4/5] bg-[linear-gradient(135deg,#f8fafc_0%,#eff6ff_55%,#ffffff_100%)] p-4">
                  <div className="flex h-full items-end rounded-[1.4rem] border border-dashed border-slate-300 bg-white/80 p-4 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.18)]">
                    <div className="space-y-2">
                      <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700">
                        0{index + 1}
                      </span>
                      <p className="font-display text-xl tracking-[-0.03em] text-slate-950">
                        {item.title}
                      </p>
                      <p className="text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-start">
          <Button asChild>
            <a href={galleryProof.cta.href}>
              {galleryProof.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </motion.div>
    </Section>
  )
}
