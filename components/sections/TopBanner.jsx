'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { topBanner } from '@/lib/content'
import { fadeUp, staggerParent } from '@/lib/motion'

export default function TopBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [emphasis, ...restParts] = topBanner.text.split(' - ')
  const restText = restParts.join(' - ')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <motion.div
      className="border-b border-blue-700/20 bg-blue-600 text-white"
      initial="hidden"
      animate="show"
      variants={staggerParent}
    >
      <Container className="py-3 sm:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            className="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-4"
            variants={fadeUp}
          >
            <div className="grid grid-cols-4 gap-1.5">
              <CountdownItem label="Days" value={timeLeft.days} />
              <CountdownItem label="Hours" value={timeLeft.hours} />
              <CountdownItem label="Min" value={timeLeft.minutes} />
              <CountdownItem label="Sec" value={timeLeft.seconds} />
            </div>

            <p className="text-center text-base font-medium leading-7 sm:text-lg lg:max-w-[46rem] lg:text-left">
              <span className="font-bold text-white">{emphasis}</span>
              {restText ? ` - ${restText}` : ''}
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button asChild size="sm" variant="inverted" className="shrink-0">
              <a href={topBanner.cta.href}>
                {topBanner.cta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  )
}

function CountdownItem({ label, value }) {
  return (
    <div className="min-w-[3.2rem] rounded-[1rem] border border-white/20 bg-white/12 px-1.5 py-1 text-center backdrop-blur-sm">
      <p className="font-display text-sm tracking-[-0.05em] text-white sm:text-base">
        {String(value).padStart(2, '0')}
      </p>
      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-blue-100">
        {label}
      </p>
    </div>
  )
}

const launchDeadline = new Date('2026-04-28T20:00:00Z')

function getTimeLeft() {
  const now = Date.now()
  const diff = Math.max(launchDeadline.getTime() - now, 0)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}
