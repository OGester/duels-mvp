/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Add all paths where Tailwind classes will be used
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#454444", // Header background
        "light-gray": "#A5A5A5", // Body background
        "medium-gray": "#696969",
        "light-green": "#A4E5D9", // Sign-in button
        "green-500": "#81E0C2", // Hover state for sign-in
      },
      borderRadius: {
        lg: "0.5rem", // Matches the design
        md: "0.375rem",
      },
      boxShadow: {
        md: "0 4px 6px rgba(0, 0, 0, 0.1)", // Matches card shadow in design
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Add your custom font
      },
    },
  },
  plugins: [],
};
