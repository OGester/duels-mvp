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
        <main className="bg-light-gray flex-grow w-full flex flex-col items-center justify-center mt-6 sm:mt-8 px-4">
          {/* Center Content */}
          <div
            className="bg-dark-gray rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-[900px]"
            style={{ boxShadow: "0 4px 10px #292929" }}
          >
            <div>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
