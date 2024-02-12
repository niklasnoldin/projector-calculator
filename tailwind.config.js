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
				dark: { DEFAULT: "var(--dark)" },
				light: { DEFAULT: "var(--light)" },
				screen: { DEFAULT: "var(--screen)" },
				highlight: { DEFAULT: "var(--highlight)" },
			},
		},
	},
	plugins: [],
};
