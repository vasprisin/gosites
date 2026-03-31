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
      className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-full border border-[#25D366]/20 bg-white px-3 py-3 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/12">
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
