"use client";
import { useSearch } from "@/lib/SearchContext";

export default function Search() {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (e) => {
    //update the search query in context debounce is handled in the context
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search users or leagues"
      value={searchQuery}
      onChange={handleSearchChange}
      className="border border-slate-400 p-2"
    />
  );
}
