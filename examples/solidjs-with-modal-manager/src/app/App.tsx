import type { RouteSectionProps } from '@solidjs/router'
import { Route, Router } from '@solidjs/router'
import { HomePage } from '@/pages/home'
import { AboutPage } from '@/pages/about'
import { NotFound } from '@/pages/404'
import { ModalManagerService } from '@/shared/lib/modalManager'
import { Layout } from '@/shared/ui'

export default function App() {
  return (
    <ModalManagerService>
      <Router root={(props: RouteSectionProps) => <Layout headerSlot={<div />}>{props.children}</Layout>}>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="*404" component={NotFound} />
      </Router>
    </ModalManagerService>
  )
}
