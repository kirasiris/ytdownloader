import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const APP_NAME = publicRuntimeConfig.WEBSITE_NAME;
export const APP_DESCRIPTION = publicRuntimeConfig.WEBSITE_DESCRIPTION;
export const API_URL = publicRuntimeConfig.PRODUCTION
	? "https://befree.herokuapp.com"
	: "http://localhost:5000";
export const PUBLIC_URL = publicRuntimeConfig.PRODUCTION
	? "https://easyrest.vercel.app"
	: "http://localhost:3000";
