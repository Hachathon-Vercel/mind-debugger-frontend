/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-background': 'var(--black-background)',
        'pink': 'var(--pink)',
        'purple': 'var(--purple)',
        'white': 'var(--white)',
        'gray-background-button': 'var(--gray-background-button)',
        'gray-selection': 'var(--gray-selection)',
        'purple-background-warn': 'var(--purple-background-warn)',
        'gray-light': 'var(--gray-light)',
        'purple-selection': 'var(--purple-selection)',
        'dark-gray': 'var(--dark-gray)',
      },
      backgroundImage: theme => ({
        'backgroundTexture': "url('/src/assets/images/bg-texture.png')",
      }),
    },
  },
  plugins: [],
}
