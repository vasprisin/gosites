'use client'

import { motion } from 'framer-motion'

import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'
import { teamMembers } from '@/lib/content'

export default function Team() {
  return (
    <Section id="team">
      <motion.div
        className="space-y-12"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp}>
          <Heading
            eyebrow="Team"
            title="Small team. Clear ownership."
            description="You are not dealing with layers of agency noise. The people shaping the work are the people responsible for moving it forward."
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.role}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="relative h-full overflow-hidden p-7 transition-colors duration-300 hover:border-slate-300 hover:bg-slate-50">
                <span className="pointer-events-none absolute right-4 top-5 bottom-5 flex items-center font-display text-[7rem] leading-none tracking-[-0.08em] text-slate-200/80 sm:right-5 sm:text-[8rem]">
                  <span className="[writing-mode:vertical-rl] [text-orientation:mixed]">
                    {`0${index + 1}`}
                  </span>
                </span>
                <div className="relative z-10 flex h-full flex-col gap-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      GoSites
                    </span>
                    <span className="h-px w-14 bg-gradient-to-r from-sky-300/90 to-transparent" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-display text-2xl tracking-[-0.04em] text-slate-950">
                      {member.role}
                    </h3>
                    <p className="text-base leading-7 text-slate-600">
                      {member.description}
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
