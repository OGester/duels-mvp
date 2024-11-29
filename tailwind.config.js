/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // add all paths where Tailwind classes will be used
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#454444", // dark background
        "light-gray": "#A5A5A5", // light background
        "medium-gray": "#696969",
        "text-shadow-grey": "#9A9A9A",
        "light-green": "#A4E5D9", // Sign-in button
        "dark-teal": "#84B6AD",
        "light-teal": "#9AE5B9",
        "custom-purple": "#9380A8",
        "dark-text": "#292929",
        "medium-text": "#3B3A3A",
        "light-text": "#D2CFCF",
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        md: "2px 2px 4px rgba(0, 0, 0, 0.4)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        lg: "0.5rem", // matches the design
        md: "0.375rem",
      },
      boxShadow: {
        md: "0 4px 6px rgba(0, 0, 0, 0.1)", // matches card shadow in design
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // add your custom font
      },
    },
  },
  plugins: [],
};
