import bugType from "/src/assets/types/bug.svg";
import darkType from "/src/assets/types/dark.svg";
import dragonType from "/src/assets/types/dragon.svg";
import electricType from "/src/assets/types/electric.svg";
import fairyType from "/src/assets/types/fairy.svg";
import fightingType from "/src/assets/types/fighting.svg";
import fireType from "/src/assets/types/fire.svg";
import flyingType from "/src/assets/types/flying.svg";
import ghostType from "/src/assets/types/ghost.svg";
import grassType from "/src/assets/types/grass.svg";
import groundType from "/src/assets/types/ground.svg";
import iceType from "/src/assets/types/ice.svg";
import normalType from "/src/assets/types/normal.svg";
import poisonType from "/src/assets/types/poison.svg";
import psychicType from "/src/assets/types/psychic.svg";
import rockType from "/src/assets/types/rock.svg";
import steelType from "/src/assets/types/steel.svg";
import waterType from "/src/assets/types/water.svg";

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
