import type { RouteSectionProps } from '@solidjs/router'
import { Layout } from '@/shared/ui'
import { Header } from '@/widgets/header'

type Props = RouteSectionProps

/**
 * ✅ FSD Best practice:
 *
 * (1) Devide layout in two modules: dumb layout grid (`@shared/ui/Layout/*`)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid cross-import with dependency inversion via render prop pattern
 * Pass widgets as props to layout
 */
export function BaseLayout(props: Props) {
  return (
    <Layout headerSlot={<Header />}>
      {props.children}
    </Layout>
  )
}
