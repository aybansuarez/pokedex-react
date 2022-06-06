function NoPokemonFound() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-8">
      <img
        className="w-28 grayscale"
        src="https://img.pokemondb.net/artwork/vector/psyduck.png"
      />
      <p className="text-center text-3xl font-bold uppercase">
        No Pokémon found
      </p>
    </div>
  );
}

export default NoPokemonFound;
