import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-[1.75rem] border p-6 shadow-[0_30px_100px_-56px_rgba(15,23,42,0.16)] backdrop-blur-xl',
  {
    variants: {
      tone: {
        default: 'border-slate-200 bg-white/95',
        muted: 'border-slate-200 bg-slate-50/90',
        accent: 'border-sky-200 bg-gradient-to-b from-sky-50 via-white to-amber-50/40',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  }
)

export default function Card({
  as: Comp = 'div',
  className,
  tone,
  children,
  ...props
}) {
  return (
    <Comp className={cn(cardVariants({ tone }), className)} {...props}>
      {children}
    </Comp>
  )
}
