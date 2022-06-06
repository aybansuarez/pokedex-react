import { pokeAPI } from "./pokeAPI";

export function fetchRegion(id) {
  return async () => {
    const res = await pokeAPI.get(`/region/${id}`);
    return res.data;
  };
}

export function fetchRegions() {
  return async () => {
    const res = await pokeAPI.get(`/region`);
    return res.data;
  };
}
