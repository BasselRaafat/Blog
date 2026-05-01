export default {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			animation: {
				fadeIn: "fadeIn 1s ease-in-out",
			},
		},
	},

	variants: {},
	plugins: [require("@tailwindcss/typography")],
};
