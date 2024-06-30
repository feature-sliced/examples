import css from './PokemonCardStub.module.css'

type Props = {
  isLoading?: boolean
}

export function PokemonCardStub(props: Props) {
  return (
    <div classList={{ [css.root]: true, [css.root_pulsed]: Boolean(props.isLoading) }}>
      <div style={{ width: '200px', height: '32px' }} />
      <div style={{ width: '200px', height: '200px' }} />
      <div style={{ width: '50px', height: '19px' }} />
      <div style={{ width: '100px', height: '24px' }} />
    </div>
  )
}
