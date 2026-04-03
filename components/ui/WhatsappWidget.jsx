const WHATSAPP_LINK =
  'https://api.whatsapp.com/send?phone=447818023420&text=I%20would%20like%20to%20learn%20more%20about%20gosites.uk'

export default function WhatsappWidget() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with GoSites on WhatsApp"
      data-ph-event="whatsapp_click"
      data-ph-location="floating_widget"
      data-ph-contact-method="whatsapp"
      data-ph-contact-target={WHATSAPP_LINK}
      className="fixed bottom-4 right-4 z-[70] flex items-center gap-2 rounded-full border border-[#25D366]/20 bg-white px-2.5 py-2.5 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.28)] transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-5 sm:right-5 sm:gap-3 sm:px-3 sm:py-3"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/12 sm:h-11 sm:w-11">
        <img
          src="/social/whatsapp.svg"
          alt="WhatsApp"
          className="h-6 w-6 object-contain"
        />
      </span>
      <span className="hidden pr-2 text-sm font-semibold text-slate-950 sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  )
}
