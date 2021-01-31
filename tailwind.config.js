module.exports = {
  purge: {
    content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    // These options are passed through directly to PurgeCSS
    options: {
      // TODO: read from constant.js
      safelist: [
        "text-yellow-500",
        "text-green-500",
        "text-blue-500",
        "text-red-500",
        "text-yellow-300",
        "text-purple-400",
        "text-yellow-600",
        "text-blue-300",
        "text-pink-400",
        "text-gray-400"
      ]
    }
  },
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      textDecoration: ["active"]
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
