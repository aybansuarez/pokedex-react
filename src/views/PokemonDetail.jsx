import { Fragment } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { fetchPokemonDetails, fetchPokemonSpecies } from "/src/api/pokemon";
import Seo from "/src/components/Seo";
import TypeIcon from "/src/components/TypeIcon";

import { getPokemonDescription, getPokemonGenus } from "/src/utils/common";

function PokemonDetail() {
  const { name } = useParams();
  const { data: pokemon, isSuccess: isPokemonSuccess } = useQuery(
    ["pokemonDetails", name],
    fetchPokemonDetails(name)
  );
  const pokemonId = pokemon?.id;

  const { data: species, isSuccess: isSpeciesSuccess } = useQuery(
    ["pokemonSpecies", pokemonId],
    fetchPokemonSpecies(pokemonId),
    {
      enabled: !!pokemonId,
      refetchOnWindowFocus: false,
    }
  );

  const isSuccess = isPokemonSuccess && isSpeciesSuccess;
  console.log(species);
  return (
    <Fragment>
      <Seo title={name.toLocaleUpperCase()} description="Pokémon" />
      <div className="srz-layout py-10">
        {isSuccess && (
          <div className="flex flex-col lg:flex-row">
            <div className="m-auto flex-1">
              <img
                className="mx-auto w-3/4 lg:mx-0 lg:w-auto"
                src={pokemon?.sprites.other["official-artwork"].front_default}
              />
            </div>
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex flex-1 flex-col items-center gap-2 text-center lg:items-start lg:text-left">
                <p className="flex flex-col items-center gap-2 uppercase lg:flex-row">
                  <span className="font-stencil_one text-4xl font-black xs:text-5xl md:text-7xl">
                    {species?.name}
                  </span>
                </p>
                <p className="text-lg font-bold uppercase md:text-2xl">
                  {getPokemonGenus(species?.genera)}
                </p>
                <p>{getPokemonDescription(species?.flavor_text_entries)}</p>
              </div>
              <div className="flex justify-center gap-x-2 lg:justify-start">
                {pokemon?.types.map((type, index) => {
                  return (
                    <span
                      key={index}
                      className={`flex text-xs uppercase type-${type.type.name}-dark items-center gap-2 rounded-full px-3 py-1 font-bold text-white`}
                    >
                      <TypeIcon
                        key={index}
                        type={type.type.name}
                        className="h-6 w-6"
                      />
                      {type.type.name}
                    </span>
                  );
                })}
              </div>
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-2">
                <div className="flex flex-1 flex-col gap-6 sm:gap-3">
                  <div>
                    <table className="table h-full w-full table-fixed border-separate bg-slate-900">
                      <thead>
                        <tr colSpan={2} className="bg-slate-900 text-white">
                          <th
                            colSpan={2}
                            className="py-2 px-1 text-left text-xl font-bold uppercase"
                          >
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="bg-white py-1 px-1 uppercase">
                            Height
                          </td>
                          <td className="bg-white py-1 text-center font-bold">
                            {pokemon?.height / 10} m
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-white py-1 px-1 uppercase">
                            Weight
                          </td>
                          <td className="bg-white py-1 text-center font-bold">
                            {pokemon?.weight / 10} kg
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-white py-1 px-1 uppercase">
                            Color
                          </td>
                          <td className="bg-white py-1 text-center font-bold capitalize">
                            {species?.color.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-white py-1 px-1 uppercase">
                            Habitat
                          </td>
                          <td className="bg-white py-1 text-center font-bold capitalize">
                            {species?.habitat
                              ? species?.habitat.name
                              : "Unknown"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table className="table h-full w-full border-separate bg-slate-900">
                      <thead>
                        <tr colSpan={2} className="bg-slate-900 text-white">
                          <th
                            colSpan={2}
                            className="px-1 py-2 text-left text-xl font-bold uppercase"
                          >
                            Abilities
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pokemon?.abilities.map((ability, index) => {
                          return (
                            <tr key={index}>
                              <td
                                className={
                                  ability.is_hidden
                                    ? "bg-slate-300 px-1 py-1"
                                    : "bg-white px-1 py-1"
                                }
                              >
                                <span className="capitalize">
                                  {ability.ability.name.replace("-", " ")}
                                </span>
                                {ability.is_hidden && (
                                  <span className="text-sm">
                                    &nbsp;(hidden)
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex-1">
                  <table className="table h-full w-full border-separate bg-slate-900">
                    <thead>
                      <tr colSpan={2} className="bg-slate-900 text-white">
                        <th
                          colSpan={2}
                          className="px-1 py-2 text-left text-xl font-bold uppercase"
                        >
                          Stats
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pokemon?.stats.map((stat, index) => (
                        <tr key={index}>
                          <td className="bg-white py-1 px-1 uppercase">
                            {stat.stat.name.replace("-", " ")}
                          </td>
                          <td className="bg-white py-1 text-center font-bold">
                            {stat.base_stat}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default PokemonDetail;
