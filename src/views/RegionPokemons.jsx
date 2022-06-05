import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchRegion } from "/src/api/region";
import { fetchPokedex } from "/src/api/pokedex";
import { fetchGeneration } from "/src/api/generation";
import PokemonCard from "/src/components/PokemonCard";
import PokedexList from "/src/components/PokedexList";
import Seo from "/src/components/Seo";
import {
  getIDFromURL,
  getCapitalizedString,
  getGenerationName,
} from "/src/utils/common";

function RegionPokemons() {
  const { name } = useParams();
  const [title, setTitle] = useState(null);
  const [pokedexID, setPokedexID] = useState(null);

  const { data: region } = useQuery(["pokemonRegion", name], fetchRegion(name));
  const regionID = region?.id;
  const { data: generation, isSuccess: genSuccess } = useQuery(
    ["pokemonGeneration", regionID],
    fetchGeneration(regionID),
    {
      enabled: !!regionID,
    }
  );

  const { data: pokedex, isSuccess } = useQuery(
    ["pokemonPokedex", pokedexID],
    fetchPokedex(pokedexID),
    {
      enabled: !!pokedexID && !!generation,
    }
  );

  useEffect(() => {
    const dexID = pokedexID
      ? pokedexID
      : getIDFromURL(region?.pokedexes[0].url);

    if (genSuccess) {
      setPokedexID(dexID);
    }
  }, [genSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setTitle(`${getCapitalizedString(region.name)} Pokedex`);
    }
  }, [isSuccess]);

  return (
    <Fragment>
      <Seo title={title} description="Pokémon" lang="en" meta={[]} />
      <div className="dex-layout mx-auto pt-10 pb-20">
        <Fragment>
          {genSuccess ? (
            <Fragment>
              <div className="mb-5 flex flex-col items-center justify-between gap-2 font-stencil_one">
                <h1 className="text-6xl font-black uppercase xs:text-7xl md:text-8xl">
                  {region.name}
                </h1>
                <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                  {getGenerationName(generation.names)} Pokémon
                </h1>
              </div>
              <div className="z-40 my-5">
                <PokedexList
                  list={region.pokedexes}
                  entries={pokedex?.pokemon_entries.length}
                  setPokedexID={setPokedexID}
                />
              </div>
            </Fragment>
          ) : null}
          <div className="grid grid-cols-1 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {isSuccess ? (
              <Fragment>
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
              </Fragment>
            ) : null}
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}

export default RegionPokemons;
