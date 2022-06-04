export const getPokemonType = (types) => {
  if (types[0].type.name == "normal" && types.length > 1) {
    return types[1].type.name;
  }
  return types[0].type.name;
};

export const getPokemonDescription = (textEntries) => {
  const flavorText = textEntries.find((e) => e.language.name === "en");
  return JSON.stringify(flavorText.flavor_text).replace(/\\n|\\f|"/g, " ");
};

export const getPokemonGenus = (generaEntries) => {
  const genera = generaEntries.find((e) => e.language.name === "en");
  return genera.genus;
};

export const getPokemonID = (id) => {
  return ("0000" + id).slice(-3);
};

export const getIDFromURL = (url) => {
  if (url) {
    const pathname = new URL(url).pathname;
    return pathname.split("/")[4];
  }
  return undefined;
};

export const getCapitalizedString = (text) => {
  if (text) {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  }
  return undefined;
};

export const getGenerationName = (names) => {
  if (names) {
    const generation = names.find((e) => e.language.name === "en");
    const name = generation.name.replace("Generation", "Gen");
    return name;
  }
  return undefined;
};
