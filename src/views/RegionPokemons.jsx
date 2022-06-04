import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchRegion } from "/src/api/region";
import { fetchPokedex } from "/src/api/pokedex";
import { fetchGeneration } from "/src/api/generation";
import PokemonCard from "/src/components/PokemonCard";
import { Link } from "react-router-dom";
import Seo from "/src/components/Seo";
import Spinner from "/src/components/Spinner";
import pokeball from "/src/assets/pokeball.svg";
import {
  getIDFromURL,
  getCapitalizedString,
  getGenerationName,
} from "/src/utils/common";

function RegionPokemons() {
  const { name } = useParams();
  const [title, setTitle] = useState(null);

  const { data: region } = useQuery(["pokemonRegion", name], fetchRegion(name));
  const regionID = region?.id;
  const { data: generation } = useQuery(
    ["pokemonGeneration", regionID],
    fetchGeneration(regionID),
    {
      enabled: !!regionID,
    }
  );
  const pokedexID = getIDFromURL(region?.pokedexes[0].url);
  const {
    data: pokedex,
    isLoading,
    isSuccess,
  } = useQuery(["pokemonPokedex", pokedexID], fetchPokedex(pokedexID), {
    enabled: !!pokedexID && !!generation,
  });

  useEffect(() => {
    if (isSuccess) {
      setTitle(`${getCapitalizedString(region.name)} Pokedex`);
    }
  }, [isSuccess]);

  const loading = isLoading || !isSuccess;

  return (
    <Fragment>
      <Seo title={title} description="Pokémon" lang="en" meta={[]} />
      <div className="dex-layout mx-auto pt-10 pb-20">
        {loading ? (
          <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
            <Spinner image={pokeball} />
          </div>
        ) : (
          <Fragment>
            <div className="mb-5 flex flex-col items-center justify-between gap-2">
              <h1 className="text-4xl font-black uppercase xs:text-5xl sm:text-7xl md:text-8xl">
                {region.name}
              </h1>
              <h1 className="font-bold xs:text-2xl sm:text-3xl md:text-4xl">
                {getGenerationName(generation.names)} Pokémon
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {pokedex.pokemon_entries.map((pokemon) => {
                return (
                  <PokemonCard
                    id={getIDFromURL(pokemon.pokemon_species.url)}
                    entry={pokemon.entry_number}
                    name={pokemon.pokemon_species.name}
                    key={pokemon.entry_number}
                  />
                );
              })}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default RegionPokemons;
