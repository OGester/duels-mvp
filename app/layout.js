import "./globals.css";

export const metadata = {
  title: "Duels Prototype",
  description: "Test space for Tjing duels mvp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <header>[HEADER]</header>
        <main className="">{children}</main>
        <footer className="text-green-500">This is the footer</footer>
      </body>
    </html>
  );
}
