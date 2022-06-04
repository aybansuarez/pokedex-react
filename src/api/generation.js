import { pokeAPI } from "./pokeAPI";

export function fetchGeneration(id) {
  return async () => {
    const res = await pokeAPI.get(`/generation/${id}`);
    return res.data;
  };
}
