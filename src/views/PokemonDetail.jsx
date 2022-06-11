import { Fragment } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { fetchPokemonDetails, fetchPokemonSpecies } from "/src/api/pokemon";
import Seo from "/src/components/Seo";
import Spinner from "/src/components/Spinner";

import {
  getPokemonType,
  getPokemonDescription,
  getPokemonGenus,
} from "/src/utils/common";

function PokemonDetail() {
  const { name } = useParams();
  const { data: pokemon } = useQuery(
    ["pokemonDetails", name],
    fetchPokemonDetails(name)
  );

  const pokemonId = pokemon?.id;

  const { data: species, status } = useQuery(
    ["pokemonSpecies", pokemonId],
    fetchPokemonSpecies(pokemonId),
    {
      enabled: !!pokemonId,
      refetchOnWindowFocus: false,
    }
  );

  let content;
  if (status === "loading") {
    content = <Spinner />;
  }

  if (status === "success") {
    const pokemonID = ("0000" + pokemon.id).slice(-3);
    const pokemonType = getPokemonType(pokemon.types);
    const pokemonDesc = getPokemonDescription(species.flavor_text_entries);
    const pokemonGenus = getPokemonGenus(species.genera);

    content = (
      <div className={`type-${pokemonType}-light`}>
        <div className="srz-layout">
          <div className="flex">
            <div className="flex-1">
              <p className="text-2xl">#{pokemonID}</p>
              <p className="font-holtwood text-7xl font-bold uppercase">
                {species.name}
              </p>
              <p>{pokemonGenus}</p>
              <p>{pokemonDesc}</p>
              <div className="flex gap-x-2">
                {pokemon.types.map((type, index) => {
                  return (
                    <span
                      key={index}
                      className={`text-xs uppercase type-${type.type.name}-dark rounded border-2 border-black px-3 py-1 font-bold text-white`}
                    >
                      {type.type.name}
                    </span>
                  );
                })}
              </div>
              <div className="my-10">
                {pokemon.abilities.map((ability, index) => {
                  return (
                    <p key={index} className="capitalize">
                      {ability.ability.name}
                    </p>
                  );
                })}
              </div>
              <div className="my-10">
                {pokemon.stats.map((stat, index) => {
                  return (
                    <p key={index} className="capitalize">
                      {stat.stat.name}: {stat.base_stat}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="w-1/3">
              <div className="my-10">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <Seo
        title={name.toLocaleUpperCase()}
        description="Pokémon"
        lang="en"
        meta={[]}
      />
      {content}
    </Fragment>
  );
}

export default PokemonDetail;
