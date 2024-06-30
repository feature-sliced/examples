import css from './Header.module.css'

export function Header() {
  return (
    <header class={css.root} data-fsd="shared/ui/header">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </header>
  )
}
