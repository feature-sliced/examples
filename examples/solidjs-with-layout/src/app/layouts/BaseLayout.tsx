import type { RouteSectionProps } from '@solidjs/router'
import { Layout } from '@/shared/ui'
import { Header } from '@/widgets/header'

type Props = RouteSectionProps

/**
 * ✅ FSD Best practice:
 *
 * (1) Divide layout in two modules: dumb layout grid (`@shared/ui/Layout/*`)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid importing from higher layers with dependency inversion
 * via the render prop pattern
 */
export function BaseLayout(props: Props) {
  return (
    <Layout headerSlot={<Header />}>
      {props.children}
    </Layout>
  )
}
