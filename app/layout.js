import "./globals.css";
import "@/styles/root.css";

import NavBar from "@/components/Navbar";

export const metadata = {
  title: "My League Prototype",
  description: "Test space for My League mvp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="full-height">
        {/* Header */}
        <header className="header">
          <NavBar />
        </header>

        {/* Content */}
        <main className="main-container">
          {/* Center Content */}
          <div
            className="content-wrapper"
            style={{ boxShadow: "0 4px 10px #292929" }}
          >
            <div>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
