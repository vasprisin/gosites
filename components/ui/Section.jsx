import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'

export default function Section({
  as: Comp = 'section',
  id,
  className,
  containerClassName,
  children,
}) {
  return (
    <Comp id={id} className={cn('relative py-24 sm:py-28 lg:py-32', className)}>
      <Container className={containerClassName}>{children}</Container>
    </Comp>
  )
}
