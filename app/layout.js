import "./globals.css";
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "Duels Prototype",
  description: "Test space for Tjing duels mvp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="px-4 py-2">
        <header>
          <NavBar />
        </header>
        <main className="flex justify-center">{children}</main>
        <footer className="border-t text-center text-xs py-2 max-w-6xl mx-auto my-12">
          Duels by Tjing est. 2024
        </footer>
      </body>
    </html>
  );
}
