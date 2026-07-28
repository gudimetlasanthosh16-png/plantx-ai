export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        secondary: '#22C55E',
        accent: '#84CC16',
        danger: '#EF4444',
        warning: '#F59E0B',
        background: '#F8FFF5',
        'dark-background': '#0F172A',
        text: '#1E293B',
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
