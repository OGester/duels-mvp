import "./globals.css";
import NavBar from "@/components/Navbar";
import { SearchProvider } from "@/lib/SearchContext";
//import { useSearch } from "@/lib/SearchContext";
import SearchResults from "@/components/SearchResults";

export const metadata = {
  title: "Duels Prototype",
  description: "Test space for Tjing duels mvp",
};

export default function RootLayout({ children }) {
  //allows access to the search query from the context
  //const { searchQuery } = useSearch();
  return (
    <html lang="en">
      <body className="px-4 py-2">
        <SearchProvider>
          <header>
            <NavBar />
          </header>
          <main className="flex flex-col justify-center">
            <div className="flex justify-center">
              <SearchResults />
            </div>

            {children}
          </main>
          <footer className="border-t text-center text-xs py-2 max-w-6xl mx-auto my-12">
            Duels by Tjing est. 2024
          </footer>
        </SearchProvider>
      </body>
    </html>
  );
}
