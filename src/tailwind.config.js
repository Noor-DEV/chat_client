/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        custom: {
          op: "#00000066 ",
          chatBg: "#260801",
          sidebarBg: "#A6261B",
          circleBorder: "#FF2E00",
          sideBarTextBg: "#00000024",
          mainChatBg: "#260801",
          myText: "#FF1400",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "Arial"],
        tiltPrism: ["Tilt Prism", "Arial"],
        arapey: ["Arapey", "Arial"],
      },
    },
  },
  plugins: [],
};
