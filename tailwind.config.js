export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D5A27', // Deep forest green
        secondary: '#4A7C43', // Muted leaf green
        accent: '#D4B895', // Rustic wood/earth
        danger: '#D9534F', // Muted red
        warning: '#F5A623', // Muted orange
        background: '#F9F8F4', // Soft earthy off-white
        'dark-background': '#1A1C19', // Deep dark green-black
        text: '#2D332B', // Dark slate/olive
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        buttons: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
