import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { fetchPokemonSpecies } from "/src/api/pokemon";
import { useQuery } from "react-query";
import Spinner from "/src/components/Spinner";
import { getPokemonDescription, getPokemonGenus } from "/src/utils/common";
import { useSpeechSynthesis } from "react-speech-kit";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import {
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";

function PokemonModal({ pokemon, isOpen, closeModal }) {
  const { speak, speaking, cancel, voices } = useSpeechSynthesis();
  const [speech, setSpeech] = useState("");
  const [imageType, setImageType] = useState("front");
  const [image, setImage] = useState(pokemon.sprites.front_default);

  const changeImage = (imgType) => {
    if (imgType == "front") {
      setImageType("front");
      setImage(pokemon.sprites.front_default);
    } else {
      setImageType("back");
      setImage(pokemon.sprites.back_default);
    }
  };

  const { data: species, isSuccess } = useQuery(
    ["species", pokemon.id],
    fetchPokemonSpecies(pokemon.id),
    {
      enabled: !!pokemon.id && isOpen,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (species) {
      console.log(species);
      console.log(pokemon);
      setSpeech(
        `${species?.name}. The ${getPokemonGenus(
          species?.genera
        )}. ${getPokemonDescription(species?.flavor_text_entries)}.`
      );
    }
  }, [species]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          cancel();
          closeModal();
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
          <div className="fixed inset-0 bg-slate-900 bg-opacity-80" />
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
                          className={`m-1 w-full rounded-full bg-[#166B9F] ${
                            speaking ? "animate-pulse" : ""
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div className="relative top-6 flex w-full flex-1 items-start gap-x-2">
                      <div className="aspect-square w-[6%] rounded-full bg-[#E32A49]" />
                      <div className="aspect-square w-[6%] rounded-full bg-[#F5DB2C]" />
                      <div className="aspect-square w-[6%] rounded-full bg-[#4EAE5C]" />
                    </div>
                    <button
                      className="absolute top-6 right-6 flex h-5 w-5 items-center justify-center rounded-full border border-red-500 bg-red-500"
                      onClick={() => {
                        cancel();
                        closeModal();
                      }}
                    >
                      <XIcon className="h-4 w-4 text-red-900" />
                    </button>
                  </div>
                  <div className="my-6 flex flex-1 flex-col sm:my-8">
                    <div className="pokedex-screen-clip-path relative m-1 mx-auto flex aspect-video max-h-[320px] max-w-sm flex-1 items-center justify-center rounded-md bg-[#E0E1E1]">
                      <div className="absolute top-2 flex w-full justify-center gap-5 xs:top-3 xs:gap-8 sm:top-4">
                        <div className="aspect-square w-2 rounded-full bg-[#8B0000] xs:w-3" />
                        <div className="aspect-square w-2 rounded-full bg-[#8B0000] xs:w-3" />
                      </div>
                      <div className="absolute bottom-1 flex w-6/12 items-center justify-between xs:bottom-2 sm:w-8/12 md:bottom-2.5">
                        <div className="aspect-square w-[8%] rounded-full bg-[#8B0000]" />
                        <MenuIcon className="h-[12%] w-[12%]" />
                      </div>
                      <div className="flex aspect-video w-8/12 justify-center rounded-xl bg-slate-900 sm:w-9/12">
                        {isSuccess ? (
                          <img
                            alt={pokemon.name}
                            className="aspect-square rounded-xl bg-slate-900"
                            src={image}
                          />
                        ) : (
                          <Spinner className="w-1/2" />
                        )}
                      </div>
                    </div>
                    <div className="mx-3 flex flex-1 gap-5 xs:mx-5 sm:mx-10 sm:gap-8">
                      <div className="my-auto w-2/12 -translate-y-1/2">
                        <button
                          className="aspect-square rounded-full "
                          onClick={() => {
                            if (speaking) {
                              cancel();
                            } else {
                              speak({
                                text: speech,
                                voice: voices[1],
                                rate: 1.5,
                              });
                            }
                          }}
                        >
                          {speaking ? (
                            <StopIcon className="w-full text-slate-900" />
                          ) : (
                            <PlayIcon className="w-full text-slate-900" />
                          )}
                        </button>
                      </div>
                      <div className="flex w-5/12 flex-col justify-around xs:w-6/12 sm:w-5/12">
                        <div className="flex justify-evenly">
                          <button
                            onClick={() => {
                              changeImage("front");
                            }}
                            className={`h-2 w-12 rounded-full  ${
                              imageType == "front"
                                ? "bg-slate-800"
                                : "bg-slate-400"
                            }`}
                          />
                          <button
                            onClick={() => {
                              changeImage("back");
                            }}
                            className={`h-2 w-12 rounded-full  ${
                              imageType == "back"
                                ? "bg-slate-800"
                                : "bg-slate-400"
                            }`}
                          />
                        </div>
                        <div className="font-mono">
                          <p className="rounded-lg bg-green-500 py-6 text-center font-bold uppercase shadow-inner xs:py-8 xs:text-xl sm:py-10">
                            {species?.name}
                          </p>
                        </div>
                      </div>
                      <div className="my-auto flex-1">
                        <div className="grid aspect-square rotate-45 grid-cols-2 overflow-hidden rounded-full bg-black">
                          <button className="bg-black hover:bg-black">
                            <ChevronUpIcon className="mx-auto w-5 -rotate-45 text-white" />
                          </button>
                          <button className="bg-black hover:bg-black">
                            <ChevronRightIcon className="mx-auto w-5 -rotate-45 text-white" />
                          </button>
                          <button className="bg-black hover:bg-black">
                            <ChevronLeftIcon className="mx-auto w-5 -rotate-45 text-white" />
                          </button>
                          <button className="bg-black hover:bg-black">
                            <ChevronDownIcon className="mx-auto w-5 -rotate-45 text-white" />
                          </button>
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
