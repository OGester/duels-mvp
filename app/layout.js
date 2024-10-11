import "./globals.css";
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "Duels Prototype",
  description: "Test space for Tjing duels mvp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <header>
          <NavBar />
        </header>
        <main className="">{children}</main>
        <footer className="border-t">This is the footer</footer>
      </body>
    </html>
  );
}
