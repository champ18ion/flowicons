/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9', // Sky blue-ish
                    600: '#0284c7',
                },
                dark: {
                    900: '#0a0a0a', // Deep black
                    800: '#171717', // Neutral 900
                    700: '#262626', // Neutral 800
                }
            }
        },
    },
    plugins: [],
}
