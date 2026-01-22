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
            background: "#0F1419",
            alt: "#371C51",
            card: "#16202A",
            border: "#2E3A46",
            button: "#2C3440",
            buttonHover: "#343F4C",
            primary: "#191919",
            secondary: "#1E2A36",
            muted: "#8B98A5",
            info:"#22D3EE",
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
            facebook: "#1877F2",
            purple: "#AD46FF",
            green: "#00C950"
        },
        container: {
            center: true,
            padding: "2em"
        },
        extend: {
            animation: {
                meteor: "meteor 5s linear infinite",
                "spin-reverse": 'spin-reverse 1s linear infinite'
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
                'spin-reverse': {
                    from: {
                        transform: 'rotate(360deg)',
                    },
                    to: {
                        transform: 'rotate(0deg)',
                    },
                }
            },
        },
    },
    darkMode: "class",
    plugins: [],
};

export default config;
