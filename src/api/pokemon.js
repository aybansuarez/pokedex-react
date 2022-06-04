import { pokeAPI } from "./pokeAPI";

export function fetchPokemons(limit) {
  return async ({ pageParam: offset = 0 }) => {
    const res = await pokeAPI.get(
      `/pokemon-species?offset=${offset}&limit=${limit}`
    );
    return res.data;
  };
}

export function fetchPokemonDetails(name) {
  return async () => {
    const res = await pokeAPI.get(`/pokemon/${name}`);
    return res.data;
  };
}

export function fetchPokemonSpecies(name) {
  return async () => {
    const res = await pokeAPI.get(`/pokemon-species/${name}`);
    return res.data;
  };
}
