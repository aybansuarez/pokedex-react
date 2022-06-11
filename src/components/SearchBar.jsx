import { SearchIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.length) {
      onSearch(query);
    }
  }, [query]);

  return (
    <div className="relative mx-auto flex max-w-lg items-center justify-center">
      <input
        type="text"
        className="w-full rounded-full border-2 border-slate-900 px-14 py-2 text-center"
        placeholder="Search Pokémon"
        onKeyUp={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(query);
        }}
      />
      <SearchIcon
        className="absolute right-4 h-6 w-6 cursor-pointer"
        onClick={() => {
          onSearch(query);
        }}
      />
    </div>
  );
}

export default SearchBar;
