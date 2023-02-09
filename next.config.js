module.exports = {
	env: {
		NEXT_PUBLIC_WEBSITE_NAME: process.env.WEBSITE_NAME,
		NEXT_PUBLIC_WEBSITE_DESCRIPTION: process.env.WEBSITE_DESCRIPTION,
		NEXT_PUBLIC_WEBSITE_NAME_HTTP_STRING: process.env.WEBSITE_NAME_HTTP_STRING,
		NEXT_PUBLIC_KEVINFONSECA_URL: process.env.KEVINFONSECA_URL,
		NEXT_PUBLIC_KEVINFONSECA_API_URL: process.env.KEVINFONSECA_API_URL,
		NEXT_PUBLIC_API_URL: "https://befree.herokuapp.com",
		NEXT_PUBLIC_FRONTEND_URL: "https://ytdownloader-phi.vercel.app",
		// NEXT_PUBLIC_API_URL: "http://localhost:5000",
		// NEXT_PUBLIC_FRONTEND_URL: "http://localhost:3000",
	},
	images: {
		domains: [
			"gravatar.com",
			"s3-us-west-1.amazonaws.com",
			"befreebucket-for-outputs.s3.amazonaws.com",
			"kevinurielfonseca.me",
			"i0.wp.com",
		],
	},
};
