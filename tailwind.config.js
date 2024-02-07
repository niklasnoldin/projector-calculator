/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,ts,css}"],
	theme: {
		extend: {
			spacing: {
				screenWidth: "var(--screen-width)",
				screenHeight: "var(--screen-height)",
				xl: "var(--spacing-xl)",
			},
			colors: {
				dark: { DEFAULT: "#282834" },
				light: { DEFAULT: "#faffe7" },
			},
		},
	},
	plugins: [],
};
