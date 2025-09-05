/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
            primary: '#000000', 
            secondary: '#FF0000', 
            light: '#FFFFFF', 
            },
        },
    },
    plugins: [],
}
