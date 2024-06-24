import { Route, Router } from '@solidjs/router'
import { BaseLayout } from './layouts'
import { HomePage } from '@/pages/home'
import { AboutPage } from '@/pages/about'
import { NotFound } from '@/pages/404'

export default function App() {
  return (
    <Router root={BaseLayout}>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="*404" component={NotFound} />
    </Router>
  )
}
