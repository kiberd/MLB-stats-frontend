/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'tablet': '768px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  safelist: [
    'text-2xl',
    'text-3xl',
    'bg-[blue]',
    'bg-[red]',
    'bg-[orange]',
    'bg-[green]',
    {
      pattern: /bg-[(red|green|blue|orange)]/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
  ],
}
