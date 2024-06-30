import { ErrorBoundary, Suspense, createResource } from 'solid-js'
import { queryPokemonById } from '../../api/queryPokemonById'
import { PokemonCardStub } from './PokemonCardStub'
import css from './PokemonCard.module.css'

type Props = {
  pokemonId: number
}

export function PokemonCard(props: Props) {
  const id = () => props.pokemonId

  const [data, { refetch }] = createResource(id, queryPokemonById)

  return (
    <div class={css.root} data-fsd="entity/pokemon/PokemonCard">
      <ErrorBoundary fallback={<PokemonCardStub />}>
        <Suspense fallback={<PokemonCardStub isLoading />}>
          <h1>{data()?.name}</h1>
          <img class={css.image} src={data()?.image} />
          <p>
            id=
            {data()?.id}
          </p>
          <button onClick={() => refetch()}>refresh</button>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
