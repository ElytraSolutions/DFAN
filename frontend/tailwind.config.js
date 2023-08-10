/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: {
                'black-rgba': 'rgba(0,0,0, 0.30)',
                field: '#80B380',
            },
            fontFamily: {
                nirmala: ['Nirmala UI'],
            },
        },
    },
    plugins: [],
};
