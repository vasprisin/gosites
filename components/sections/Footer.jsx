'use client'

import { motion } from 'framer-motion'

import Container from '@/components/ui/Container'
import { footerGroups, footerDisclaimer, site, socialLinks } from '@/lib/content'
import { fadeUp, staggerParent, viewport } from '@/lib/motion'

const socialIconMap = {
  Instagram: '/social/instagram.svg',
  LinkedIn: '/social/linkedin.svg',
  X: '/social/x.svg',
  Email: '/social/email.svg',
  WhatsApp: '/social/whatsapp.svg',
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-10 pt-8 sm:pt-12">
      <Container>
        <motion.div
          className="px-2 py-4 sm:px-4 sm:py-6"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerParent}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <motion.div variants={fadeUp} className="space-y-5">
              <div className="space-y-3">
                <span className="block font-display text-2xl tracking-[-0.04em] text-slate-950">
                  {site.name}
                </span>
                <p className="max-w-md text-base leading-7 text-slate-600">
                  {site.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  (() => {
                    const Icon = socialIconMap[link.label]

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-label={link.label}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-950"
                      >
                        {Icon ? (
                          <img
                            src={Icon}
                            alt={link.label}
                            className="h-5 w-5 object-contain"
                          />
                        ) : null}
                      </a>
                    )
                  })()
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid gap-8 sm:grid-cols-2 sm:gap-12"
            >
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {group.title}
                  </p>
                  <div className="flex flex-col gap-3">
                    {group.links.map((link) => (
                      <a
                        key={`${group.title}-${link.label}`}
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-slate-950"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-10 border-t border-slate-200 pt-6 text-center"
          >
            <p className="text-base font-semibold tracking-[-0.01em] text-slate-950">
              {site.madeIn}
            </p>
            <div className="mx-auto mt-3 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Disclaimer
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {footerDisclaimer}
              </p>
            </div>
            <p className="mt-2 text-sm text-slate-500">{site.copyright}</p>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  )
}
