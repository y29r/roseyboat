import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				canal: {
					green: "#5E7C6A",
					blue: "#6D98A8",
				},
				cream: "#F5F1E8",
				beige: "#DCCFB8",
				dark: "#2B2B2B",
				muted: "#8C8070",
			},
			fontFamily: {
				serif: ["var(--font-cormorant)", "Georgia", "serif"],
				sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
			},
			animation: {
				"fade-in": "fadeIn 0.8s ease-out forwards",
				"fade-up": "fadeUp 0.8s ease-out forwards",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [],
};

export default config;
