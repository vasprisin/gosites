'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { navigation, site } from '@/lib/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const nextProgress = Math.min(window.scrollY / 180, 1)
      setScrollProgress(nextProgress)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

    const { body } = document
    const previousOverflow = body.style.overflow

    body.style.overflow = open ? 'hidden' : previousOverflow

    return () => {
      body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const shellPaddingY = 11 - scrollProgress * 3
  const shellPaddingX = 18 - scrollProgress * 4
  const shellRadius = 999
  const logoSize = 42 - scrollProgress * 6
  const navPaddingY = 6 - scrollProgress * 2
  const navPaddingX = 8 - scrollProgress * 2
  const navGap = 4 - scrollProgress * 1
  const navItemPaddingX = 16 - scrollProgress * 3
  const navItemPaddingY = 7 - scrollProgress * 2
  const actionGap = 12 - scrollProgress * 4
  const outerY = scrollProgress * 2

  return (
    <motion.header
      id="top"
      className="sticky inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="pt-2 sm:pt-3">
        <motion.div
          style={{ y: outerY }}
          className="mx-auto w-full"
        >
          <motion.div
            style={{
              borderRadius: shellRadius,
              paddingTop: shellPaddingY,
              paddingBottom: shellPaddingY,
              paddingLeft: shellPaddingX,
              paddingRight: shellPaddingX,
            }}
            className="border border-slate-200 bg-white/90 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.22)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between gap-4">
              <a
                href="#top"
                data-ph-event="nav_click"
                data-ph-nav-label={site.name}
                data-ph-nav-location="header_logo"
                data-ph-nav-target="#top"
                className="group flex min-w-0 items-center pr-2"
              >
                <motion.span
                  style={{
                    height: logoSize,
                  }}
                  className="hidden shrink-0 items-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] sm:flex"
                >
                  <Image
                    src="/brand/gosites-logo-long.png"
                    alt={site.name}
                    width={1948}
                    height={431}
                    className="h-full w-auto"
                    priority
                  />
                </motion.span>
                <motion.span
                  style={{
                    height: logoSize,
                  }}
                  className="flex shrink-0 items-center gap-3 transition-transform duration-300 group-hover:scale-[1.02] sm:hidden"
                >
                  <Image
                    src="/brand/gosites-logo-mark.png"
                    alt=""
                    aria-hidden="true"
                    width={1024}
                    height={1024}
                    className="h-full w-auto shrink-0"
                    priority
                  />
                  <span className="font-display text-[1.2rem] tracking-[-0.05em] text-slate-950">
                    {site.name}
                  </span>
                </motion.span>
              </a>

              <nav className="hidden lg:flex">
                <motion.div
                  style={{
                    gap: navGap,
                    paddingTop: navPaddingY,
                    paddingBottom: navPaddingY,
                    paddingLeft: navPaddingX,
                    paddingRight: navPaddingX,
                  }}
                  className="flex items-center rounded-full"
                >
                  {navigation.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      data-ph-event="nav_click"
                      data-ph-nav-label={item.label}
                      data-ph-nav-location="header_desktop"
                      data-ph-nav-target={item.href}
                      style={{
                        paddingLeft: navItemPaddingX,
                        paddingRight: navItemPaddingX,
                        paddingTop: navItemPaddingY,
                        paddingBottom: navItemPaddingY,
                      }}
                      className="rounded-full px-4 py-2 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </motion.div>
              </nav>

              <motion.div
                style={{ gap: actionGap }}
                className="hidden items-center lg:flex"
              >
                <Button asChild className="px-4">
                  <a
                    href="#pricing"
                    data-ph-event="cta_click"
                    data-ph-cta-label="Start Now"
                    data-ph-cta-location="header_desktop"
                    data-ph-cta-target="#pricing"
                  >
                    Start Now
                  </a>
                </Button>
              </motion.div>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label="Toggle navigation"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-navigation"
              className="mx-auto mt-2 w-[calc(100%-2rem)] max-w-[1440px] overflow-hidden lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-[1.75rem] border border-slate-300 bg-white/95 p-4 backdrop-blur-2xl">
                <div className="flex flex-col gap-3">
                  {navigation.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      data-ph-event="nav_click"
                      data-ph-nav-label={item.label}
                      data-ph-nav-location="header_mobile"
                      data-ph-nav-target={item.href}
                      className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-lg font-bold text-slate-800 transition-colors hover:border-slate-400 hover:bg-white"
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="flex flex-col gap-3 pt-2">
                    <Button asChild>
                      <a
                        href="#pricing"
                        onClick={() => setOpen(false)}
                        data-ph-event="cta_click"
                        data-ph-cta-label="Start Now"
                        data-ph-cta-location="header_mobile"
                        data-ph-cta-target="#pricing"
                      >
                        Start Now
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </motion.header>
  )
}
