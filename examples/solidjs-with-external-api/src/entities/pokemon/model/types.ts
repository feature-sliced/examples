export type PokemonId = Brand<number, 'PokemonId'>

export type Pokemon = {
  id: PokemonId
  name: string
  image: Url
}
