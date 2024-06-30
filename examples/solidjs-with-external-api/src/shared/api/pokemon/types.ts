// Here you can store generated DTO types

export type PokemonDto = {
  id: number
  name: string
  sprites: PokemonSpritesDto
}

export type PokemonSpritesDto = {
  other: {
    showdown: {
      back_default: null | string
      back_female: null | string
      back_shiny: null | string
      back_shiny_female: null
      front_default: null | string
      front_female: null | string
      front_shiny: null | string
      front_shiny_female: null | string
    }
  }
}
