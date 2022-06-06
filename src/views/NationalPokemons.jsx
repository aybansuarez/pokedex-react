import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery } from "react-query";

import { fetchPokedex } from "/src/api/pokedex";
import NoPokemonFound from "/src/components/NoPokemonFound";
import PokemonCard from "/src/components/PokemonCard";
import SearchBar from "/src/components/SearchBar";
import Seo from "/src/components/Seo";
import Spinner from "/src/components/Spinner";
import { getIDFromURL, filterPokemons } from "/src/utils/common";

function NationalPokemons() {
  const limit = 60;
  const [indexPos, setIndexPos] = useState(0);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonFound, setPokemonFound] = useState(null);

  const {
    data: pokedex,
    isLoading,
    isSuccess,
  } = useQuery(["pokedex", "national"], fetchPokedex("national"), {
    refetchOnWindowFocus: false,
  });

  const loadMorePokemon = () => {
    const pokemon = data.slice(indexPos, indexPos + limit);
    setItems((currentPokemon) => {
      return [...currentPokemon, ...pokemon];
    });
    setIndexPos((currentValue) => {
      return currentValue + limit;
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setData(pokedex.pokemon_entries);
    }
  }, [isSuccess]);

  useEffect(() => {
    setPokemonFound(filterPokemons(data, searchQuery).length);
  }, [searchQuery]);

  return (
    <Fragment>
      <Seo title="National Pokédex" description="Pokémon" lang="en" meta={[]} />
      <div className="dex-layout relative mx-auto w-full py-10">
        {isLoading ? (
          <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
            <Spinner />
          </div>
        ) : null}
        {isSuccess ? (
          <Fragment>
            <div className="mb-5 flex flex-col items-center justify-between gap-2 font-stencil_one">
              <h1 className="text-6xl font-black uppercase xs:text-7xl md:text-8xl">
                National
              </h1>
              <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                All Generations
              </h1>
            </div>
            <SearchBar onSearch={setSearchQuery} />
            {searchQuery ? (
              <Fragment>
                <div className="grid grid-cols-1 gap-2 pt-10 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {filterPokemons(data, searchQuery).map((result) => {
                    const pokemonId = getIDFromURL(result.pokemon_species.url);
                    return (
                      <PokemonCard
                        id={pokemonId}
                        entry={pokemonId}
                        name={result.pokemon_species.name}
                        key={pokemonId}
                      />
                    );
                  })}
                </div>
                {!pokemonFound && <NoPokemonFound />}
              </Fragment>
            ) : (
              <InfiniteScroll
                className="grid grid-cols-1 gap-2 pt-10 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
                loadMore={loadMorePokemon}
                hasMore={indexPos < data.length}
                loader={
                  <div
                    className="col-span-1 mt-4 flex h-full w-full justify-center xs:col-span-3 sm:col-span-4 md:col-span-5 lg:col-span-6"
                    key={0}
                  >
                    <Spinner className="w-12" />
                  </div>
                }
              >
                {items.map((result) => {
                  const pokemonId = getIDFromURL(result.pokemon_species.url);
                  return (
                    <PokemonCard
                      id={pokemonId}
                      entry={pokemonId}
                      name={result.pokemon_species.name}
                      key={pokemonId}
                    />
                  );
                })}
              </InfiniteScroll>
            )}
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
}

export default NationalPokemons;
