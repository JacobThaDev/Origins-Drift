import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            background: "#181d23",
            alt: "#371C51",
            card: "#232A33",
            button: "#2C3440",
            buttonHover: "#343F4C",
            primary: "#191919",
            secondary: "#292929",
            muted: "#505050",
            info:"#08B0F0",
            white: "#FFFFFF",
            black: "#000000",
            danger: "#d2433f",
            warning: "#f0ad4e",
            success: "#62af66",
            infodark: "#184556",
            successdark: "#324132",
            errordark: "#682F2D",
            transparent: "#00000000",
            discord: "#7289da",
            youtube: "#cd201f",
            facebook: "#1877F2"
        },
        container: {
            center: true,
            padding: "2em"
        },
        extend: {
            animation: {
                meteor: "meteor 5s linear infinite",
            },
            keyframes: {
                meteor: {
                    "0%": { 
                        transform: "rotate(215deg) translateX(0)", 
                        opacity: "1" 
                    },
                    "70%": { 
                        opacity: "1" 
                    },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: "0",
                    },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [],
};

export default config;
