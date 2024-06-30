import { Title } from '@solidjs/meta'
import { A } from '@solidjs/router'

export function NotFound() {
  return (
    <main>
      <Title>Not Found</Title>
      <h1>Page Not Found</h1>
      <p>
        Page not found.
        <A href="/">Return to main page</A>
      </p>
    </main>
  )
}
