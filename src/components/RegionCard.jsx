import { useQuery } from "react-query";
import { fetchGeneration } from "/src/api/generation";
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

function RegionCard({ id }) {
  const { data, isLoading, isSuccess } = useQuery(
    ["pokemonGeneration", id],
    fetchGeneration(id)
  );

  const [isBgLoaded, setIsBgLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      const img = new Image();
      img.onload = () => {
        setIsBgLoaded(true);
      };
      img.src = `/assets/regions/${data.main_region.name}.webp`;
    }
  }, [data]);

  const loading = isLoading || !isBgLoaded || !isSuccess;

  return (
    <Fragment>
      {loading ? (
        <div className="relative aspect-video h-full w-full max-w-[558px] animate-pulse bg-slate-200">
          <div className="absolute flex h-full w-full flex-col items-center gap-y-1 p-5">
            <div className="h-6 w-12 rounded-xl bg-slate-300" />
            <div className="h-12 w-48 rounded-3xl bg-slate-300 font-black xs:h-16 sm:w-60 xl:h-24 xl:w-96" />
          </div>
        </div>
      ) : (
        <div className="group relative select-none overflow-hidden">
          <Link key={id} to={`/regions/${data.main_region.name}`}>
            <div
              className="absolute h-full w-full bg-cover bg-center bg-no-repeat brightness-[25%] duration-100 ease-in group-hover:scale-150 group-hover:brightness-[40%]"
              style={{
                backgroundImage: `url('/assets/regions/${data.main_region.name}.webp')`,
              }}
            />
            <div className="relative flex aspect-video w-full flex-col items-center p-5">
              <div className="z-10 grid h-full grid-cols-3 content-evenly pt-10 sm:pt-16">
                {getGetStarters(
                  data.pokemon_species,
                  data.main_region.name
                ).map((pokemon, index) => {
                  return (
                    <img
                      key={index}
                      alt={pokemon.name}
                      className="brightness-50 duration-100 ease-in first:ml-auto last:mr-auto even:mx-auto group-hover:brightness-100"
                      src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                    />
                  );
                })}
              </div>
              <div className="absolute font-stencil_one uppercase text-white brightness-50 duration-100 ease-in group-hover:brightness-100">
                <p className="text-center">{getGenerationName(data.names)}</p>
                <p className="text-5xl font-black xs:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
                  {data.main_region.name}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default RegionCard;
