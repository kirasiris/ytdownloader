import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SSRProvider from "react-bootstrap/SSRProvider";
import "@/css/bootstrap.min.css";
import "@/css/App.css";
import { GlobalProvider } from "@/helpers/globalContext";

const MyApp = ({ Component, pageProps }) => {
	return (
		<SSRProvider>
			<GlobalProvider>
				<Component {...pageProps} />
				<ToastContainer />
			</GlobalProvider>
		</SSRProvider>
	);
};

export default MyApp;
