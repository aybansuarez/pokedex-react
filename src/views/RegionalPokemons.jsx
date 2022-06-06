import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { fetchPokedex } from "/src/api/pokedex";
import { fetchRegion } from "/src/api/region";
import NoPokemonFound from "/src/components/NoPokemonFound";
import PokemonCard from "/src/components/PokemonCard";
import PokedexList from "/src/components/PokedexList";
import SearchBar from "/src/components/SearchBar";
import Seo from "/src/components/Seo";
import Spinner from "/src/components/Spinner";
import {
  getIDFromURL,
  getCapitalizedString,
  filterPokemons,
} from "/src/utils/common";

function RegionalPokemons() {
  const { name } = useParams();
  const [title, setTitle] = useState(null);
  const [pokedexID, setPokedexID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonFound, setPokemonFound] = useState(null);

  const {
    data: region,
    isLoading: isRegionLoading,
    isSuccess: isRegionSuccess,
  } = useQuery(["region", name], fetchRegion(name), {
    refetchOnWindowFocus: false,
  });

  const {
    data: pokedex,
    isLoading: isPokedexLoading,
    isSuccess: isPokedexSuccess,
  } = useQuery(["pokedex", pokedexID], fetchPokedex(pokedexID), {
    enabled: !!pokedexID && !!region,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const dexID = pokedexID
      ? pokedexID
      : getIDFromURL(region?.pokedexes[0].url);

    if (isRegionSuccess) {
      setPokedexID(dexID);
    }
  }, [isRegionSuccess]);

  const isSuccess = isPokedexSuccess && isRegionSuccess;
  const isLoading = isPokedexLoading || isRegionLoading || !isSuccess;

  useEffect(() => {
    if (isSuccess) {
      setTitle(`${getCapitalizedString(region?.name)} Pokedex`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isPokedexSuccess) {
      setPokemonFound(
        filterPokemons(pokedex?.pokemon_entries, searchQuery).length
      );
    }
  }, [searchQuery]);

  return (
    <Fragment>
      <Seo title={title} description="Pokémon" lang="en" meta={[]} />
      <div className="dex-layout mx-auto py-10">
        <Fragment>
          {isRegionSuccess ? (
            <Fragment>
              <div className="mb-5 flex flex-col items-center justify-between gap-2 font-stencil_one">
                <h1 className="text-6xl font-black uppercase xs:text-7xl md:text-8xl">
                  {region?.name}
                </h1>
              </div>
              <div className="z-40 my-5">
                <PokedexList
                  pokedexList={region?.pokedexes}
                  pokemonEntries={pokedex?.pokemon_entries.length}
                  setPokedexID={setPokedexID}
                />
              </div>
            </Fragment>
          ) : null}
          {isLoading ? (
            <div className="flex items-center justify-center pt-28">
              <Spinner />
            </div>
          ) : (
            <Fragment>
              <SearchBar onSearch={setSearchQuery} />
              <div className="grid grid-cols-1 gap-2 pt-10 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {filterPokemons(pokedex?.pokemon_entries, searchQuery).map(
                  (pokemon) => {
                    return (
                      <PokemonCard
                        id={getIDFromURL(pokemon.pokemon_species.url)}
                        entry={pokemon.entry_number}
                        name={pokemon.pokemon_species.name}
                        key={pokemon.entry_number}
                      />
                    );
                  }
                )}
              </div>
              {searchQuery && !pokemonFound && <NoPokemonFound />}
            </Fragment>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
}

export default RegionalPokemons;
