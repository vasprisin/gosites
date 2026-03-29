import { cn } from '@/lib/utils'

export default function Container({
  as: Comp = 'div',
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn('mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12', className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
