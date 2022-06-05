import Seo from "/src/components/Seo";
import { Fragment } from "react";
import RegionCard from "/src/components/RegionCard";

const generations = 8;
const createRegions = (gens) => {
  const regions = [];
  for (let i = 1; i <= gens; i++) {
    regions.push(<RegionCard key={i} id={i} />);
  }
  return regions;
};

function Regions() {
  return (
    <Fragment>
      <Seo title="Regions" description="Pokémon" lang="en" meta={[]} />
      <div className="dex-layout mx-auto pt-10">
        <div className="flex flex-col gap-4">
          <p className="font-stencil_one text-4xl font-bold uppercase xs:text-5xl md:text-6xl">
            Regions
          </p>
          <p>
            The organized areas of the Pokémon world. The main difference
            between regions is the species of Pokémon that can be encountered
            within them.
          </p>
          <p>
            Click one of the {generations} regions below to see the different
            types of Pokémon obtainable in that location.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-1 py-10 sm:grid-cols-2">
          {createRegions(generations)}
        </div>
      </div>
    </Fragment>
  );
}

export default Regions;
