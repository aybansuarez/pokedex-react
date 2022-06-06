import { SearchIcon } from "@heroicons/react/outline";

function SearchBar({ onSearch }) {
  return (
    <div className="relative mx-auto flex max-w-lg items-center justify-center">
      <input
        type="text"
        className="w-full rounded-full border-2 border-slate-900 px-14 py-2 text-center"
        placeholder="Search Pokémon"
        onKeyUp={(e) => {
          onSearch(e.target.value);
        }}
      />
      <SearchIcon className="absolute left-4 h-6 w-6" />
    </div>
  );
}

export default SearchBar;
