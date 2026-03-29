import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border-blue-600 bg-blue-600 px-5 text-white shadow-[0_20px_60px_-28px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 hover:bg-blue-500',
        secondary:
          'border-slate-200 bg-white px-5 text-slate-700 backdrop-blur-xl hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50',
        ghost:
          'border-transparent bg-transparent px-5 text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950',
        inverted:
          'border-slate-950 bg-slate-950 px-5 text-white shadow-[0_18px_48px_-28px_rgba(15,23,42,0.35)] hover:bg-slate-800',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export default function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { buttonVariants }
