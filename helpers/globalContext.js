import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const GlobalContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GlobalProvider = ({ children }) => {
	axios.defaults.baseURL = `${API_URL}/api/v1`;
	axios.defaults.headers.common["Content-Type"] = `application/json`;
	axios.defaults.headers.common["Accept"] = `application/json`;

	axios.interceptors.response.use(
		async (res) => {
			return res;
		},
		async (err) => {
			let res = err?.response;

			if (res?.status === 401 && res?.config && !res?.config?._isRetryRequest) {
				toast.error("There was an error with the axios interceptor...");
			}
		}
	);

	/*
	 *
	 * MOST OF THE PAGES WILL USE THIS. THATS THE REASON OF MAKING THIS REQUEST
	 * AS A GLOBAL CONTEXT
	 *
	 */

	return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalContext;
