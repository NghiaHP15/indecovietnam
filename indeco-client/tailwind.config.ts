// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',     // App Router pages
    './pages/**/*.{js,ts,jsx,tsx}',   // Nếu có Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // Các component
  ],
  theme: {
    extend: {
        keyframes: {
            showcontent: {
                '0%': { opacity: '0', transform: 'translate(0,100px)', filter: 'blur(33px)' },
                '100%': { opacity: '1', transform: 'translate(0,0)', filter: 'blur(0)' },
            },
            "accordion-down": {
            from: { height: "0", opacity: "0", transform: "translateY(-4px)" },
            to: { height: "var(--radix-accordion-content-height)", opacity: "1", transform: "translateY(0)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)", opacity: "1", transform: "translateY(0)" },
              to: { height: "0", opacity: "0", transform: "translateY(-4px)" },
            },
        },
        animation: {
            showcontent: 'showcontent 1s ease-in-out forwards',
            'showcontent-delay1': 'showcontent 1s ease-in-out 0.3s forwards',
            'showcontent-delay2': 'showcontent 1s ease-in-out 0.6s forwards',
            "accordion-down": "accordion-down 0.3s ease-out",
            "accordion-up": "accordion-up 0.3s ease-in",
        },
    },
  },
  plugins: [],
};

export default config;