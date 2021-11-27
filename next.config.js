module.exports = {
	env: {
		WEBSITE_NAME: "YTDownloader",
		WEBSITE_DESCRIPTION:
			"An actual good YouTube videos downloader, totally for free!.",
		WEBSITE_NAME_HTTP_STRING: "ytdownloader",
		WEBSITE_STRIPE_PUBLIC_KEY: "pk_test_4Dk6bq2sILbKjTN6C1lQil0K00oosTHzg5",
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
};
