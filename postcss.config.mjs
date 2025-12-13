/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        '@tailwindcss/postcss': {}, // <--- Updated to the correct package
    },
};

export default config;
