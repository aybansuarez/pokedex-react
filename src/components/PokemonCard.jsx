import { useQuery } from "react-query";

import { fetchPokemonDetails } from "/src/api/pokemon";
import TypeIcon from "/src/components/TypeIcon";
import { Fragment, useState, useEffect } from "react";
import { getPokemonType, getPokemonID } from "/src/utils/common";
import { getTypeIcon } from "/src/utils/getIcons";
import PokemonModal from "./PokemonModal";

function PokemonCard({
  id,
  entry,
  name,
  openModal,
  setPokemonID,
  setPokemonEntry,
}) {
  const {
    data: pokemon,
    isLoading: pokemonIsLoading,
    isSuccess,
  } = useQuery(["details", id], fetchPokemonDetails(id), {
    refetchOnWindowFocus: false,
  });

  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const img = new Image();
      img.onload = () => {
        setIsImgLoaded(true);
      };
      img.src = pokemon?.sprites?.front_default;
    }
  }, [isSuccess]);

  const isLoading = pokemonIsLoading || (!isImgLoaded && !isSuccess);

  return (
    <Fragment>
      {isLoading ? (
        <div className="relative flex aspect-[3/1] animate-pulse overflow-hidden rounded-xl bg-slate-200 xs:aspect-[2/3] xs:flex-col">
          <div className="absolute right-0 z-20 m-1 flex gap-x-px">
            <div className="aspect-square w-5 rounded-full bg-slate-300" />
          </div>
          <div className="m-auto flex flex-1 items-center justify-center">
            <div className="absolute z-10 aspect-square w-32 rounded-full bg-slate-300 xs:block xs:w-24 xl:w-32" />
          </div>
          <div className="flex flex-1 flex-col items-start justify-center gap-y-2 xs:mb-5 xs:flex-none xs:items-center xs:gap-y-1">
            <div className="h-5 w-3/5 rounded-xl bg-slate-300" />
            <div className="h-5 w-14 rounded-full bg-slate-300" />
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="group mx-auto aspect-[3/1] w-full select-none xs:aspect-[2/3]">
            <div
              className="relative z-10 flex h-full cursor-pointer hover:z-30 xs:flex-col"
              onClick={() => {
                openModal();
                setPokemonID(id);
                setPokemonEntry(entry);
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div
                className={`absolute h-full w-full rounded-xl p-0 ${
                  hovered
                    ? `type-${getPokemonType(pokemon?.types)}`
                    : `type-${getPokemonType(pokemon?.types)}-light`
                }`}
              />
              <div className="absolute right-0 z-30 m-1 flex gap-x-px">
                {pokemon?.types?.map((result, index) => {
                  return (
                    <TypeIcon
                      key={index}
                      type={result.type.name}
                      className="w-5 rounded-full border"
                    />
                  );
                })}
              </div>
              <div className="relative flex h-full flex-1 justify-between overflow-hidden xs:flex-col">
                <div className="m-auto flex h-full w-full flex-1 items-center justify-center">
                  <img
                    src={getTypeIcon(getPokemonType(pokemon?.types))}
                    alt={getPokemonType(pokemon?.types)}
                    className="group-hover:animate-once absolute z-10 object-scale-down opacity-25 brightness-75 group-hover:animate-ping group-hover:opacity-100 xs:w-24 xl:w-32"
                  />
                  <img
                    className="relative z-20 scale-90 object-contain group-hover:scale-100 xs:scale-105 group-hover:xs:top-6 group-hover:xs:scale-125 group-hover:xs:animate-bounce_fast"
                    alt={name}
                    src={pokemon?.sprites?.front_default}
                  />
                </div>
                <div className="z-20 flex flex-1 flex-col items-start justify-center gap-y-2 xs:mb-5 xs:flex-none xs:items-center xs:gap-y-1">
                  <p className="text-sm font-bold capitalize xs:text-center">
                    {name}
                  </p>
                  <span
                    className={`rounded-full border border-transparent type-${getPokemonType(
                      pokemon?.types
                    )}-dark px-3 py-px text-xs text-white`}
                  >
                    &#35;{getPokemonID(entry)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default PokemonCard;
