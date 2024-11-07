"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

//this is a context to hold the search state
const SearchContext = createContext();

//provider for the search context
export function SearchProvider({ children }) {
  //here is the raw search query eneterd by user
  const [searchQuery, setSearchQuery] = useState("");
  //debounced query with 1 second delay (1000ms)
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const [results, setResults] = useState({ users: [], leagues: [] });
  const [loading, setLoading] = useState(false);
  //to check if a search has been done
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setResults({ users: [], leagues: [] });
      setLoading(false);
      setHasSearched(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      //reset before a new search starts
      setHasSearched(false);
      try {
        const res = await fetch(`/api/search?query=${debouncedSearchQuery}`);
        const data = await res.json();
        setResults(data);
        //verifies that a search has been performed
        setHasSearched(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    //only fetching results when debounceSearchQuery changes
    fetchResults();

    //trigger fetch when debouncedSearchQuery changes
  }, [debouncedSearchQuery]);

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, results, loading, hasSearched }}
    >
      {children}
    </SearchContext.Provider>
  );
}

//custom hook to be able to use search context
export const useSearch = () => useContext(SearchContext);
