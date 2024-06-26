import { Title } from '@solidjs/meta'

export function HomePage() {
  return (
    <main>
      <Title>Home</Title>
      <h1>examples/solidjs-with-layout</h1>
      <p>
        This example shows how to work work with layout (or layouts). Split layout to dumb component (with markup) and smart component for widget compositions.
      </p>
      <p>
        Dumb layout can be placed in the shared layer, smart - in the app layer.
      </p>
    </main>
  )
}
