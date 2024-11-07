"use client";
import { useSearch } from "@/lib/SearchContext";

export default function SearchResults() {
  const { searchQuery, results, loading, hasSearched } = useSearch();

  /*  //determine if search is in loading state
  const isLoading =
    searchQuery && results.users.length === 0 && results.leagues.length === 0;
*/
  //show "Sorry, no results found" if search doesnt find any results
  const noResults =
    hasSearched &&
    !loading &&
    searchQuery &&
    results.users.length === 0 &&
    results.leagues.length === 0;

  //will not render the search results if search query is empty
  if (!searchQuery) {
    return null;
  }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : noResults ? (
        <div>Sorry, no results found!</div>
      ) : (
        <>
          <h3>Search Results</h3>

          {results.users.length > 0 && (
            <div>
              <h4>Users</h4>
              <ul>
                {results.users.map((user) => (
                  <li key={user.id}>{user.username}</li>
                ))}
              </ul>
            </div>
          )}

          {results.leagues.length > 0 && (
            <div>
              <h4>Leagues</h4>
              <ul>
                {results.leagues.map((league) => (
                  <li key={league.id}>{league.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/*   {results.users.length === 0 &&
            results.leagues.length === 0 &&
            noResults && <div>Sorry, No results found!</div>} */}
        </>
      )}
    </div>
  );
}
