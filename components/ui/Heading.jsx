import Badge from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const sizes = {
  hero: {
    title:
      'max-w-5xl text-5xl leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl',
    description: 'max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl',
  },
  lg: {
    title:
      'max-w-3xl text-3xl leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl',
    description: 'max-w-2xl text-base leading-7 text-slate-600 sm:text-lg',
  },
  md: {
    title: 'max-w-2xl text-2xl leading-tight tracking-[-0.03em] sm:text-3xl',
    description: 'max-w-xl text-base leading-7 text-slate-600',
  },
}

export default function Heading({
  align = 'left',
  as: TitleTag = 'h2',
  className,
  description,
  descriptionClassName,
  eyebrow,
  size = 'lg',
  title,
  titleClassName,
}) {
  const currentSize = sizes[size]
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={cn('flex flex-col gap-5', alignment, className)}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      {title ? (
        <TitleTag
          className={cn(
            'font-display text-slate-950',
            currentSize.title,
            titleClassName
          )}
        >
          {title}
        </TitleTag>
      ) : null}
      {description ? (
        <p className={cn(currentSize.description, descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
