import { Link } from "react-router-dom";
import githubLogo from "/assets/github.svg";
import logo from "/assets/logo.png";
export default function Footer() {
  return (
    <div className="bg-slate-900">
      <div className="srz-layout text-white">
        <div className="mx-auto flex max-w-[230px] flex-col gap-10 py-5 md:max-w-none md:flex-row">
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-x-2">
              <img
                className="h-12 w-auto brightness-0 invert filter"
                src={logo}
                alt="pokemon"
              />
              <p className="font-stencil_one text-2xl uppercase text-white xs:text-4xl">
                Pokedex
              </p>
            </Link>
          </div>
          <div className="flex flex-1 flex-col">
            <h1 className="mb-2 text-lg font-bold lg:text-xl">
              Data and Images from
            </h1>
            <a
              target="_blank"
              href="https://www.pokemon.com/"
              rel="noopener noreferrer"
            >
              Pokemon
            </a>
            <a
              target="_blank"
              href="https://pokeapi.co/"
              rel="noopener noreferrer"
            >
              PokeAPI.co
            </a>
            <a
              target="_blank"
              href="https://pokemondb.net/"
              rel="noopener noreferrer"
            >
              PokemonDB
            </a>
            <a
              target="_blank"
              href="https://nintendo.fandom.com/wiki/Nintendo_Wiki"
              rel="noopener noreferrer"
            >
              Nintendo Fandom
            </a>
          </div>
          <div>
            <a
              href="https://github.com/aybansuarez/pokedex-react"
              className="flex items-center gap-x-2"
            >
              <img src={githubLogo} alt="github" />
              View on Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
