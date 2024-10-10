import "./globals.css";

export const metadata = {
  title: "Duels Prototype",
  description: "Test space for Tjing duels mvp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-400 px-4 py-2">
        <header>[HEADER]</header>
        <main className="bg-slate-400 py-3">{children}</main>
        <footer className="border-t py-3 text-center text-xs">[FOOTER]</footer>
      </body>
    </html>
  );
}
