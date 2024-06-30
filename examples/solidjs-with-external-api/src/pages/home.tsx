import { Title } from '@solidjs/meta'
import { createSignal, resetErrorBoundaries } from 'solid-js'
import { PokemonCard } from '@/entities/pokemon'

const DEFAULT_POKEMON_ID = 35

export function HomePage() {
  const [query, setSearchQuery] = createSignal(String(DEFAULT_POKEMON_ID))
  const [pokemonId, setPokemonId] = createSignal(DEFAULT_POKEMON_ID)

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    setPokemonId(Number(query()))
    resetErrorBoundaries()
  }

  return (
    <main>
      <Title>Home</Title>
      <h1>examples/solidjs-with-external-api</h1>
      <p>
        Read more details in the
        {' '}
        <a href="https://github.com/feature-sliced/examples/blob/master/examples/solidjs-with-external-api/README.md">README.md</a>
        .
      </p>
      <div>
        <h2>Fetch a pokemon by id</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={query()} onInput={(e) => { setSearchQuery(e.currentTarget.value) }} />
          <button>Load a pokemon by id</button>
        </form>
      </div>
      <PokemonCard pokemonId={pokemonId()} />
    </main>
  )
}
