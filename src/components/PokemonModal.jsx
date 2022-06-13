import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useCallback } from "react";
import { fetchPokemonSpecies, fetchPokemonDetails } from "/src/api/pokemon";
import { useQuery } from "react-query";
import Spinner from "/src/components/Spinner";
import { getPokemonDescription, getPokemonGenus } from "/src/utils/common";
import { useSpeechSynthesis } from "react-speech-kit";
import {
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import questionMark from "/assets/question.svg";
import { getIDFromURL, getPokemonID } from "/src/utils/common";
import { getTypeIcon } from "/src/utils/getIcons";

function PokemonModal({
  pokemonID,
  entryNumber,
  entries,
  isOpen,
  setIsOpen,
  setPokemonID,
  setPokemonEntry,
}) {
  const { speak, speaking, cancel } = useSpeechSynthesis();
  const [speech, setSpeech] = useState("");
  const [isFront, setIsFront] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const { data: details } = useQuery(
    ["details", pokemonID],
    fetchPokemonDetails(pokemonID),
    {
      enabled: !!pokemonID && isOpen,
      refetchOnWindowFocus: false,
    }
  );

  const { data: species, isSuccess } = useQuery(
    ["species", pokemonID],
    fetchPokemonSpecies(pokemonID),
    {
      enabled: !!pokemonID && isOpen,
      refetchOnWindowFocus: false,
    }
  );

  const handlePrevPokemon = () => {
    const index = entries.findIndex((entry) => {
      return entry.entry_number == entryNumber;
    });

    if (index) {
      const newPokemon = entries[index - 1];
      const id = getIDFromURL(newPokemon.pokemon_species.url);
      setPokemonEntry(newPokemon.entry_number);
      setPokemonID(id);
      cancel();
    }
  };

  const handleNextPokemon = () => {
    const index = entries.findIndex((entry) => {
      return entry.entry_number == entryNumber;
    });

    if (index < entries.length - 1) {
      const newPokemon = entries[index + 1];
      const id = getIDFromURL(newPokemon.pokemon_species.url);
      setPokemonEntry(newPokemon.entry_number);
      setPokemonID(id);
      cancel();
    }
  };

  const labels = ["Pkmn", "Type/s", "H/W"];

  const handleNextDetail = () => {
    if (activeTab === labels.length - 1) {
      setActiveTab(0);
    } else {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrevDetail = () => {
    if (activeTab) {
      setActiveTab((prev) => prev - 1);
    } else {
      setActiveTab(labels.length - 1);
    }
  };

  const arrowKeyHandler = useCallback(
    ({ key }) => {
      if (key == "ArrowUp") {
        handlePrevPokemon();
      }
      if (key == "ArrowDown") {
        handleNextPokemon();
      }
      if (key == "ArrowLeft") {
        handlePrevDetail();
      }
      if (key == "ArrowRight") {
        handleNextDetail();
      }
    },
    [entryNumber, pokemonID, activeTab]
  );

  useEffect(() => {
    if (species) {
      setSpeech(
        `${species?.name}. The ${getPokemonGenus(
          species?.genera
        )}. ${getPokemonDescription(species?.flavor_text_entries)}.`
      );
    }
  }, [species]);

  useEffect(() => {
    window.addEventListener("keydown", arrowKeyHandler);

    return () => {
      window.removeEventListener("keydown", arrowKeyHandler);
    };
  }, [pokemonID, entryNumber, activeTab]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          cancel();
          setIsOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="aspect-[5/7] w-full max-w-lg transform overflow-hidden rounded-2xl bg-[#C10C0D] text-left align-middle shadow-xl transition-all">
                <div className="flex h-full select-none flex-col overflow-hidden">
                  <div className="pokedex-clip-path relative flex aspect-[8/2] w-full bg-[#8B0000]">
                    <div className="w-flex flex h-full w-3/12 items-center justify-center">
                      <div className="flex aspect-square w-2/3 rounded-full bg-white">
                        <div
                          className={`m-1 flex w-full justify-center rounded-full bg-[#166B9F] ${
                            speaking
                              ? "animate-pulse bg-green-500"
                              : "bg-[#166B9F]"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div className="relative top-6 flex w-full flex-1 items-start gap-x-2">
                      <div
                        className={`aspect-square w-[6%] rounded-full bg-[#E32A49] brightness-50 ${
                          speaking ? "animate-blink" : ""
                        }`}
                      />
                      <div
                        className={`aspect-square w-[6%] rounded-full bg-[#F5DB2C] brightness-50 ${
                          speaking ? "animation-delay-300 animate-blink" : ""
                        }`}
                      />
                      <div
                        className={`aspect-square w-[6%] rounded-full bg-[#4EAE5C] brightness-50 ${
                          speaking ? "animation-delay-600 animate-blink" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div className="my-6 flex flex-1 flex-col sm:my-8">
                    <div className="pokedex-screen-clip-path relative m-1 mx-auto flex aspect-video w-3/4 flex-1 items-center justify-center rounded-md bg-[#E0E1E1]">
                      <div className="absolute top-2 flex w-full justify-center gap-5 xs:top-3 xs:gap-8 sm:top-4">
                        <div
                          className={`aspect-square w-2 rounded-full bg-[#8B0000] brightness-50 xs:w-3 ${
                            speaking ? "animate-blink" : ""
                          }`}
                        />
                        <div
                          className={`aspect-square w-2 rounded-full bg-[#8B0000] brightness-50 xs:w-3 ${
                            speaking ? "animate-blink" : ""
                          }`}
                        />
                      </div>
                      <div className="absolute bottom-1 flex w-6/12 items-center justify-between xs:bottom-2 sm:w-8/12 md:bottom-2.5">
                        <div
                          className={`aspect-square w-[8%] rounded-full bg-[#8B0000] brightness-50 ${
                            speaking ? "animate-blink" : ""
                          }`}
                        />
                        <MenuIcon className="h-[12%] w-[12%]" />
                      </div>
                      <div className="flex aspect-video w-9/12 justify-center rounded-xl bg-slate-900">
                        {isSuccess ? (
                          <img
                            alt={details?.name}
                            className="aspect-square rounded-xl bg-slate-900"
                            src={
                              isFront
                                ? details?.sprites.front_default
                                : details?.sprites.back_default
                                ? details?.sprites.back_default
                                : questionMark
                            }
                          />
                        ) : (
                          <Spinner className="w-1/2" />
                        )}
                      </div>
                    </div>
                    <div className="mx-3 flex flex-1 gap-5 xs:mx-5 sm:mx-10 sm:gap-8">
                      <div className="flex flex-1 flex-col justify-around xs:w-6/12 sm:w-5/12">
                        <div className="flex flex-1 justify-between">
                          <button className="w-1/4 rounded-full focus:outline-none">
                            <Link
                              to={`/pokedex/p/${details?.name}`}
                              className="flex aspect-square w-full items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white xs:text-4xl"
                            >
                              A
                            </Link>
                          </button>
                          <div className="flex items-center justify-end gap-1 xs:gap-3">
                            <button
                              className="h-fit w-12 rounded-xl bg-red-900 py-1 text-[10px] uppercase text-white xs:w-16 xs:text-xs"
                              onClick={() => {
                                if (speaking) {
                                  cancel();
                                } else {
                                  speak({
                                    text: speech,
                                    rate: 1.5,
                                  });
                                }
                              }}
                            >
                              {speaking ? "Stop" : "Speak"}
                            </button>
                            <button
                              onClick={() => {
                                setIsFront(!isFront);
                              }}
                              className="h-fit w-12 rounded-xl bg-blue-900 py-1 text-[10px] uppercase text-white xs:w-16 xs:text-xs"
                            >
                              IMG
                            </button>
                          </div>
                        </div>
                        <div className="flex h-full flex-1 flex-col items-center justify-center rounded-lg border-4 border-double border-green-600 bg-green-500 uppercase">
                          <div className="grid w-full grid-cols-3 rounded-t-lg border-b border-green-600 text-center text-lg">
                            {labels.map((label, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`text-xs xs:text-base ${
                                    activeTab === index
                                      ? "bg-green-600 font-extrabold text-green-900"
                                      : ""
                                  } first-of-type:rounded-tl-sm last-of-type:rounded-tr-sm
                                  `}
                                >
                                  {label}
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex h-full flex-1 items-center">
                            <div
                              className={`flex h-full flex-col text-center ${
                                activeTab === 0 ? "block" : "hidden"
                              }`}
                            >
                              <p className="flex flex-1 items-end justify-center text-xs xs:text-base">
                                #{getPokemonID(entryNumber)}
                              </p>
                              <p className="flex-1 text-base font-bold xs:text-xl">
                                {species?.name}
                              </p>
                            </div>
                            <div
                              className={`${
                                activeTab === 1 ? "block" : "hidden"
                              }`}
                            >
                              {details?.types.map((result, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center gap-x-1"
                                  >
                                    <img
                                      src={getTypeIcon(result.type.name)}
                                      alt={result.type.name}
                                      className="h-3 w-3 rounded-full border border-green-900 xs:h-5 xs:w-5"
                                    />
                                    <p className="text-xs xs:text-base">
                                      {result.type.name}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                            <div
                              className={`${
                                activeTab === 2 ? "block" : "hidden"
                              }`}
                            >
                              <table className="text-xs xs:text-base">
                                <tbody>
                                  <tr>
                                    <td className="text-center">H</td>
                                    <td>
                                      <p>: {details?.height / 10} m</p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-center">W</td>
                                    <td>
                                      <p>: {details?.weight / 10} kg</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-auto w-1/4">
                        <div className="grid aspect-square grid-rows-3">
                          <div className="grid grid-cols-3">
                            <div />
                            <button
                              className="rounded bg-slate-900 focus:outline-none"
                              onClick={handlePrevPokemon}
                            >
                              <ChevronUpIcon className="mx-auto w-4 text-white" />
                            </button>
                            <div />
                          </div>
                          <div className="grid grid-cols-3">
                            <button
                              className="rounded bg-slate-900 focus:outline-none"
                              onClick={handlePrevDetail}
                            >
                              <ChevronLeftIcon className="mx-auto w-4 text-white" />
                            </button>
                            <div className="cursor-pointer rounded bg-slate-900"></div>
                            <button className="rounded bg-slate-900 focus:outline-none">
                              <ChevronRightIcon
                                className="mx-auto w-4 text-white"
                                onClick={handleNextDetail}
                              />
                            </button>
                          </div>
                          <div className="grid grid-cols-3">
                            <div />
                            <button
                              className="rounded bg-slate-900 focus:outline-none"
                              onClick={handleNextPokemon}
                            >
                              <ChevronDownIcon className="mx-auto w-4 text-white" />
                            </button>
                            <div />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PokemonModal;
