import "./globals.css";

export const metadata = {
  title: "Duels Prototype",
  description: "Test space for Tjing duels mvp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div></div>
        {children}
      </body>
    </html>
  );
}
