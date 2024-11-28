import "./globals.css";
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "My League Prototype",
  description: "Test space for My League mvp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="min-h-full w-full bg-light-gray flex flex-col items-center">
        {/* Header */}
        <header
          className="w-full bg-dark-gray text-white py-4 border-b-2 border-medium-gray"
          style={{
            boxShadow: "0 4px 10px #292929",
            borderLeft: "2px solid #medium-gray",
            borderRight: "2px solid #medium-gray",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          <div className="w-2/3 mx-auto">
            <NavBar />
          </div>
        </header>

        {/* content */}
        <main className="bg-light-gray flex-grow w-full flex flex-col items-center justify-center mt-6">
          {/* Center Content  */}
          <div
            className="bg-dark-gray rounded-lg p-6 h-full w-full max-w-[900px]"
            style={{ boxShadow: "0 4px 10px #292929" }}
          >
            <div>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
