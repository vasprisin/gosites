'use client'

import { useRef } from 'react'
import Script from 'next/script'

function initializeCalendlyWidget(container, url) {
  if (
    !container ||
    !url ||
    typeof window === 'undefined' ||
    !window.Calendly?.initInlineWidget
  ) {
    return
  }

  container.innerHTML = ''
  window.Calendly.initInlineWidget({
    url,
    parentElement: container,
  })
}

export default function CalendlyInlineWidget({
  url,
  height = 700,
  minWidth = 320,
}) {
  const containerRef = useRef(null)

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => initializeCalendlyWidget(containerRef.current, url)}
      />
      <div
        ref={containerRef}
        className="calendly-inline-widget"
        data-url={url}
        style={{
          minWidth: `${minWidth}px`,
          height: `${height}px`,
        }}
      />
    </>
  )
}
