import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]',
  {
    variants: {
      variant: {
        neutral: 'border-slate-950 bg-slate-950 text-white backdrop-blur-xl',
        accent: 'border-sky-200 bg-sky-50 text-sky-700',
        inverted: 'border-slate-950 bg-slate-950 text-white',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
)

export default function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
