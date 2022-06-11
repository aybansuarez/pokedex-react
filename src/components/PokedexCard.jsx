import { useQuery } from "react-query";
import { fetchGeneration } from "/src/api/generation";
import { fetchRegion } from "/src/api/region";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenerationName } from "/src/utils/common";

const getGetStarters = (pokemons, region) => {
  let start = 0;
  let starterCount = 3;

  if (region == "unova") {
    start++;
    starterCount++;
  }

  const starters = pokemons.slice(start, starterCount);
  return starters;
};

function PokedexCard({ name }) {
  const [isBgLoaded, setIsBgLoaded] = useState(true);

  const {
    data: region,
    isLoading: isRegionLoading,
    isSuccess: isRegionSuccess,
  } = useQuery(["region", name], fetchRegion(name), {
    refetchOnWindowFocus: false,
  });

  const {
    data: generation,
    isLoading: isGenerationLoading,
    isSuccess: isGenerationSuccess,
  } = useQuery(
    ["generation", region?.main_generation?.name],
    fetchGeneration(region?.main_generation?.name),
    { enabled: !!region, refetchOnWindowFocus: false }
  );

  const isSuccess = isRegionSuccess && isGenerationSuccess && isBgLoaded;
  const isLoading = isRegionLoading || isGenerationLoading || !isSuccess;

  useEffect(() => {
    if (isRegionSuccess) {
      const img = new Image();
      img.onload = () => {
        setIsBgLoaded(true);
      };
      img.src = `/assets/pokedex/${region?.name}.webp`;
    }
  }, [isRegionSuccess]);

  return (
    <Fragment>
      {isLoading ? (
        <div className="relative aspect-video animate-pulse bg-slate-200">
          <div className="absolute flex w-full flex-col items-center gap-y-1 p-5">
            <div className="h-6 w-12 rounded-xl bg-slate-300" />
            <div className="h-12 w-48 rounded-3xl bg-slate-300 xs:h-16 sm:w-60 xl:h-24 xl:w-96" />
          </div>
        </div>
      ) : (
        <div className="group relative select-none overflow-hidden">
          <Link to={`/pokedex/${region?.name}`}>
            <div
              className="absolute h-full w-full bg-cover bg-center bg-no-repeat brightness-[30%] duration-150 ease-in group-hover:scale-150 group-hover:brightness-50"
              style={{
                backgroundImage: `url('/assets/pokedex/${region?.name}.webp')`,
              }}
            />
            <div className="relative flex aspect-video w-full flex-col items-center p-5">
              <div className="z-10 grid h-full grid-cols-3 content-evenly pt-10 sm:pt-16">
                {getGetStarters(generation?.pokemon_species, region?.name).map(
                  (pokemon, index) => {
                    return (
                      <img
                        key={index}
                        alt={pokemon.name}
                        className="brightness-0 duration-150 ease-in first:ml-auto last:mr-auto even:mx-auto group-hover:scale-110 group-hover:brightness-100"
                        src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                      />
                    );
                  }
                )}
              </div>
              <div className="absolute font-stencil_one uppercase text-white brightness-75 duration-150 ease-in group-hover:brightness-100">
                <p className="text-center">
                  {getGenerationName(generation?.names)}
                </p>
                <p className="text-5xl font-black xs:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
                  {region?.name}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default PokedexCard;
