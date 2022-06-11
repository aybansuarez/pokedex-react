import { Fragment } from "react";
import Seo from "/src/components/Seo";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Fragment>
      <Seo title="Pokédex" description="Pokémon" lang="en" meta={[]} />
      <div className="srz-layout flex items-center justify-center">
        <Link
          to="/pokedex"
          className="rounded-2xl bg-slate-900 p-10 text-center text-2xl font-bold text-white"
        >
          LIST OF POKEDEX
        </Link>
      </div>
    </Fragment>
  );
}

export default Home;
