import "./globals.css";
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "My League Prototype",
  description: "Test space for My League mvp",
};

export default function RootLayout({ children }) {
  //allows access to the search query from the context
  //const { searchQuery } = useSearch();
  return (
    <html lang="en">
      <body className="px-4 py-2">
        <header>
          <NavBar />
        </header>
        <main className="flex flex-col justify-center">{children}</main>
        <footer className="border-t text-center text-xs py-2 max-w-6xl mx-auto my-12">
          My League est. 2024
        </footer>
      </body>
    </html>
  );
}
