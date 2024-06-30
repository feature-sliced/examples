function sleep(ms = 500) {
  return new Promise(r => setTimeout(r, ms))
}

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fecthPokemonApi<T>(endpoint: string): Promise<T> {
  await sleep(5000)

  const response = await fetch(BASE_URL + endpoint)

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon data')
  }

  return await response.json() as T
}
