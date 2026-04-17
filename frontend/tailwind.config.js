/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        success: 'var(--success)',
        destructive: 'var(--destructive)',
        neutralGray: {
          0: 'var(--neutralGray-0)',
          100: 'var(--neutralGray-100)',
          200: 'var(--neutralGray-200)',
          300: 'var(--neutralGray-300)',
          400: 'var(--neutralGray-400)',
          500: 'var(--neutralGray-500)',
          600: 'var(--neutralGray-600)',
          700: 'var(--neutralGray-700)',
          800: 'var(--neutralGray-800)',
        },
        'chart-1': 'color(var(--chart-1))',
        'chart-2': 'color(var(--chart-2))'
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
