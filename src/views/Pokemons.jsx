import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { fetchPokemons } from "/src/api/pokemon";
import PokemonCard from "/src/components/PokemonCard";
import Seo from "/src/components/Seo";
import Spinner from "/src/components/Spinner";
import { getIDFromURL } from "/src/utils/common";

function Pokemons() {
  const limit = 60;
  const { ref, inView } = useInView({ rootMargin: "300px" });
  const {
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["pokemons", limit], fetchPokemons(limit), {
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const offset = url.searchParams.get("offset");
        return offset;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Fragment>
      <Seo title="Master List" description="Pokémon" lang="en" meta={[]} />
      <div className="dex-layout mx-auto pt-10 pb-20">
        {isLoading ? (
          <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
            <Spinner />
          </div>
        ) : null}
        {isSuccess ? (
          <Fragment>
            <div className="flex flex-col gap-4">
              <p className="font-stencil_one text-4xl font-bold uppercase xs:text-5xl md:text-6xl">
                Master List
              </p>
              <p>List of all {data?.pages[0]?.count} pokemon</p>
            </div>
            <div className="grid grid-cols-1 gap-2 py-10 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {data?.pages?.map(({ results }) => {
                return results.map((result) => {
                  const pokemonId = getIDFromURL(result.url);
                  return (
                    <PokemonCard
                      id={pokemonId}
                      entry={pokemonId}
                      name={result.name}
                      key={pokemonId}
                    />
                  );
                });
              })}
            </div>
            <div className="relative flex justify-center">
              <div className="absolute top-4" ref={ref}>
                {isFetchingNextPage ? <Spinner className="w-12" /> : null}
              </div>
            </div>
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
}

export default Pokemons;
