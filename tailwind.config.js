/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],

    theme: {
        extend: {
            fontFamily: {
                body: ["Poppins", "sans-serif"],
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in-out',
                float: 'float 2.5s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-3px)' },
                },
            },
        },
    },
    plugins: [],
};