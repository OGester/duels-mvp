import "./globals.css";

export const metadata = {
  title: "Duels Prototype",
  description: "Test space for Tjing duels mvp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>[HEADER]</header>
        <main>{children}</main>
        <footer>[FOOTER]</footer>
      </body>
    </html>
  );
}
