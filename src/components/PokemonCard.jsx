import { useQuery } from "react-query";
import { fetchPokemonDetails } from "../api/pokemon";
import TypeIcon from "../components/TypeIcon";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPokemonType, getPokemonID } from "../utils/common";
import { getTypeIcon } from "../utils/getIcons";

function PokemonCard({ id, entry, name }) {
  const { data, isLoading, isSuccess } = useQuery(
    ["pokemonDetails", id],
    fetchPokemonDetails(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [pokemonType, setPokemonType] = useState(null);
  const [pokemonID, setPokemonID] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const img = new Image();
      img.onload = () => {
        setIsImgLoaded(true);
      };
      img.src = data?.sprites.front_default;

      setPokemonType(getPokemonType(data.types));
      setPokemonID(getPokemonID(entry));
    }
  }, [isSuccess]);

  const loading = isLoading || !isImgLoaded || !isSuccess;

  return (
    <Fragment>
      {loading ? (
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
        <div className="group mx-auto aspect-[3/1] w-full select-none xs:aspect-[2/3]">
          <Link
            key={id}
            to={`/p/${name}`}
            className="relative z-10 flex h-full hover:z-30 xs:flex-col"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              className={`absolute h-full w-full rounded-xl p-0 ${
                hovered ? `type-${pokemonType}` : `type-${pokemonType}-light`
              }`}
            />
            <div className="absolute right-0 z-30 m-1 flex gap-x-px">
              {data.types.map((result, index) => {
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
                  src={getTypeIcon(pokemonType)}
                  alt={pokemonType}
                  className="group-hover:animate-once absolute z-10 object-scale-down opacity-25 brightness-75 group-hover:animate-ping group-hover:opacity-100 xs:w-24 xl:w-32"
                />
                <img
                  className="relative z-20 scale-90 object-contain group-hover:scale-100 xs:scale-105 group-hover:xs:top-6 group-hover:xs:scale-125 group-hover:xs:animate-bounce_fast"
                  alt={name}
                  src={data?.sprites.front_default}
                />
              </div>
              <div className="z-20 flex flex-1 flex-col items-start justify-center gap-y-2 xs:mb-5 xs:flex-none xs:items-center xs:gap-y-1">
                <p className="text-sm font-bold capitalize xs:text-center">
                  {name}
                </p>
                <span
                  className={`type-${pokemonType}-dark rounded-full border border-transparent px-3 py-px text-xs text-white`}
                >
                  &#35;{pokemonID}
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default PokemonCard;
