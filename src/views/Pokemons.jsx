import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";

import { fetchPokemons } from "/src/api/pokemon";
import PokemonCard from "/src/components/PokemonCard";
import Seo from "/src/components/Seo";
import Spinner from "/src/components/Spinner";
import pokeball from "/src/assets/pokeball.svg";
import { useInView } from "react-intersection-observer";
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
      <div className="bg-cover bg-fixed bg-left bg-no-repeat">
        <div className="dex-layout mx-auto pt-10 pb-20">
          {isLoading ? (
            <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
              <Spinner image={pokeball} />
            </div>
          ) : null}
          {isSuccess ? (
            <Fragment>
              <div className="grid grid-cols-1 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {data?.pages?.map(({ results }) => {
                  return results.map((result, index) => {
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
                  {isFetchingNextPage ? (
                    <Spinner image={pokeball} className="w-12" />
                  ) : null}
                </div>
              </div>
            </Fragment>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default Pokemons;
