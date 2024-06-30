import { MetaProvider, Title } from '@solidjs/meta'
import type { JSXElement } from 'solid-js'
import { Suspense } from 'solid-js'
import css from './Layout.module.css'

type Props = {
  headerSlot: JSXElement
  children: JSXElement
}

export function Layout(props: Props) {
  return (
    <MetaProvider>
      <div class={css.root} data-fsd="shared/ui/layout">
        <Title>solidjs-with-layout</Title>
        <div class={css.header}>
          {props.headerSlot}
        </div>
        <div class={css.main}>
          <Suspense>{props.children}</Suspense>
        </div>
        <footer class={css.footer}>Footer</footer>
      </div>
    </MetaProvider>
  )
}
