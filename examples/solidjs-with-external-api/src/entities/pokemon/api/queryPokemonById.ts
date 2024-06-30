import { mapPokemonDto } from '../lib/mapPokemonDto'
import type { PokemonDto } from '@/shared/api'
import { fecthPokemonApi } from '@/shared/api'

// Usually this function is provided by data-fetching library (Apollo GraphQL, RTKQ, TanStack Query)
// To map external DTO to client-side entity you should locate this query (or mutation) on entity layer,
// because external API don't know anything about client-side entity
export async function queryPokemonById(pokemonId: number) {
  const dto = await fecthPokemonApi<PokemonDto>(`/pokemon/${pokemonId}`)

  return mapPokemonDto(dto)
}
