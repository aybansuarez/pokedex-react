import Seo from "/src/components/Seo";
import { Fragment } from "react";
import { useQuery } from "react-query";
import PokedexCard from "/src/components/PokedexCard";
import { Link } from "react-router-dom";
import { fetchRegions } from "/src/api/region";

function Pokedexes() {
  const { data: region } = useQuery(["regions"], fetchRegions(), {
    refetchOnWindowFocus: false,
  });

  return (
    <Fragment>
      <Seo title="Pokédex" description="Pokémon" lang="en" meta={[]} />
      <div className="dex-layout mx-auto pt-10">
        <div className="flex flex-col gap-4">
          <p className="font-stencil_one text-4xl font-bold uppercase xs:text-5xl md:text-6xl">
            Pokédex
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 py-10 sm:grid-cols-2">
          <div className="group relative select-none overflow-hidden sm:col-span-2">
            <Link to={`/pokedex/national`}>
              <div
                className="absolute h-full w-full bg-cover bg-center bg-no-repeat brightness-[30%] duration-100 ease-in group-hover:scale-150 group-hover:brightness-50"
                style={{
                  backgroundImage: `url('/src/assets/pokedex/national.webp')`,
                }}
              />
              <div className="relative flex aspect-video w-full flex-col items-center p-5 sm:aspect-auto">
                <div className="z-10 grid h-full grid-cols-1 content-evenly pt-10 lg:pt-9 xl:pt-16">
                  <img
                    className="w-1/3 brightness-0 duration-100 ease-in first:ml-auto last:mr-auto even:mx-auto group-hover:scale-110 group-hover:brightness-100 xs:w-1/2 sm:w-1/3 md:w-1/2 lg:w-2/3"
                    src={`https://img.pokemondb.net/sprites/home/normal/pikachu.png`}
                  />
                </div>
                <div className="absolute font-stencil_one uppercase text-white brightness-75 duration-100 ease-in group-hover:brightness-100">
                  <p className="text-center">All Generations</p>
                  <p className="text-5xl font-black xs:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
                    National
                  </p>
                </div>
              </div>
            </Link>
          </div>
          {region?.results.map((region) => {
            return <PokedexCard key={region.name} name={region.name} />;
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default Pokedexes;
