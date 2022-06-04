import { pokeAPI } from "./pokeAPI";

export function fetchPokedex(id) {
  return async () => {
    const res = await pokeAPI.get(`/pokedex/${id}`);
    return res.data;
  };
}
