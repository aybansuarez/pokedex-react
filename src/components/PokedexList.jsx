import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

import logo from "/assets/logo.png";
import { getIDFromURL } from "/src/utils/common";
import { pokedexName } from "/src/utils/helper";

function PokedexList({ pokedexList, pokemonEntries, setPokedexID }) {
  const [selected, setSelected] = useState(pokedexList[0]);

  const handleChange = (e) => {
    setPokedexID(getIDFromURL(e.url));
    setSelected(e);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative mx-auto mt-1 max-w-[300px]">
        <h1 className="mb-1 text-center text-xs">
          Pokédex Entries: {pokemonEntries || "---"}
        </h1>
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-slate-300 bg-white py-2 text-center shadow-md focus:outline-none sm:text-sm">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <img src={logo} className="w-5" />
          </span>
          <span className="block">{pokedexName[selected.name]}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {pokedexList.map((pokedex) => (
              <Listbox.Option
                key={getIDFromURL(pokedex.url)}
                className={({ active }) =>
                  `relative cursor-pointer select-none text-center text-black ${
                    active ? "bg-slate-100 " : ""
                  }`
                }
                value={pokedex}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block py-2 font-medium ${
                        selected ? "bg-slate-300" : ""
                      }`}
                    >
                      {pokedexName[pokedex.name]}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <img src={logo} className="w-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default PokedexList;
