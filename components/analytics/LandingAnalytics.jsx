'use client'

import { useEffect } from 'react'

import { capturePostHogEvent } from '@/lib/posthog'

const SCROLL_THRESHOLDS = [25, 50, 75, 90]

function toSnakeCase(value) {
  return value
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toLowerCase()
}

function extractTrackedProperties(element) {
  const properties = {}

  for (const [key, value] of Object.entries(element.dataset)) {
    if (!key.startsWith('ph') || key === 'phEvent' || value === '') {
      continue
    }

    properties[toSnakeCase(key.slice(2))] = value
  }

  if (!properties.link_href && element instanceof HTMLAnchorElement) {
    properties.link_href = element.getAttribute('href') || ''
  }

  if (!properties.element_text) {
    properties.element_text = element.textContent?.trim().slice(0, 120) || ''
  }

  return properties
}

export default function LandingAnalytics() {
  useEffect(() => {
    const seenSections = new Set()
    const seenScrollDepth = new Set()
    const sections = Array.from(document.querySelectorAll('section[id]'))

    capturePostHogEvent('landing_view', {
      page_title: document.title,
      section_count: sections.length,
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const section = entry.target
          const sectionName = section.getAttribute('id')

          if (!sectionName || seenSections.has(sectionName)) {
            return
          }

          seenSections.add(sectionName)
          capturePostHogEvent('section_view', {
            section_name: sectionName,
            section_order:
              sections.findIndex((candidate) => candidate.id === sectionName) + 1,
          })
        })
      },
      {
        threshold: 0.45,
      }
    )

    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => {
      const root = document.documentElement
      const maxScroll = root.scrollHeight - window.innerHeight

      if (maxScroll <= 0) {
        return
      }

      const scrollPercent = Math.round((window.scrollY / maxScroll) * 100)

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (scrollPercent < threshold || seenScrollDepth.has(threshold)) {
          return
        }

        seenScrollDepth.add(threshold)
        capturePostHogEvent('scroll_depth_reached', {
          scroll_percentage: String(threshold),
        })
      })
    }

    const handleClick = (event) => {
      const target = event.target

      if (!(target instanceof Element)) {
        return
      }

      const trackedElement = target.closest('[data-ph-event]')

      if (!trackedElement) {
        return
      }

      const eventName = trackedElement.getAttribute('data-ph-event')

      if (!eventName) {
        return
      }

      capturePostHogEvent(eventName, extractTrackedProperties(trackedElement))
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return null
}
