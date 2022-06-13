import { SearchIcon, XIcon } from "@heroicons/react/outline";
import { useState, useEffect, useRef } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (!query.length) {
      onSearch(query);
    }
  }, [query]);

  return (
    <div className="relative mx-auto flex max-w-lg items-center justify-center">
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-full border-2 border-slate-900 py-2 pl-5 pr-20"
        placeholder="Search Pokémon"
        onKeyUp={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(query);
          if (e.key === "Escape") inputRef.current.value = "";
        }}
      />
      <SearchIcon
        className="absolute right-4 h-6 w-6 cursor-pointer"
        onClick={() => {
          onSearch(query);
        }}
      />
      {query && (
        <div className="absolute right-12 flex flex-row-reverse items-center">
          <span className="ml-1.5 h-6 w-px bg-slate-900">&nbsp;</span>
          <XIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => {
              onSearch("");
              setQuery("");
              inputRef.current.value = "";
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
