module.exports = {
	publicRuntimeConfig: {
		WEBSITE_NAME: "Easy Response",
		WEBSITE_DESCRIPTION: "Test any public api endpoint",
		PRODUCTION: true, // True when in public domain and False when in local domain
	},
	images: {
		domains: [
			"gravatar.com",
			"s3-us-west-1.amazonaws.com",
			"befreebucket-for-outputs.s3.amazonaws.com",
			"kevinurielfonseca.me",
		],
	},
	reactStrictMode: true,
};
