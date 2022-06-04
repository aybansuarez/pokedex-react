import bugType from "../assets/types/bug.svg";
import darkType from "../assets/types/dark.svg";
import dragonType from "../assets/types/dragon.svg";
import electricType from "../assets/types/electric.svg";
import fairyType from "../assets/types/fairy.svg";
import fightingType from "../assets/types/fighting.svg";
import fireType from "../assets/types/fire.svg";
import flyingType from "../assets/types/flying.svg";
import ghostType from "../assets/types/ghost.svg";
import grassType from "../assets/types/grass.svg";
import groundType from "../assets/types/ground.svg";
import iceType from "../assets/types/ice.svg";
import normalType from "../assets/types/normal.svg";
import poisonType from "../assets/types/poison.svg";
import psychicType from "../assets/types/psychic.svg";
import rockType from "../assets/types/rock.svg";
import steelType from "../assets/types/steel.svg";
import waterType from "../assets/types/water.svg";

const typeIcon = {
  bug: bugType,
  dark: darkType,
  dragon: dragonType,
  electric: electricType,
  fairy: fairyType,
  fighting: fightingType,
  fire: fireType,
  flying: flyingType,
  ghost: ghostType,
  grass: grassType,
  ground: groundType,
  ice: iceType,
  normal: normalType,
  poison: poisonType,
  psychic: psychicType,
  rock: rockType,
  steel: steelType,
  water: waterType,
};

export const getTypeIcon = (type) => {
  return typeIcon[type];
};
