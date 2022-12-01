import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SSRProvider from "react-bootstrap/SSRProvider";
import "@/css/bootstrap.min.css";
import "@/css/App.css";

const MyApp = ({ Component, pageProps }) => {
	return (
		<SSRProvider>
			<Component {...pageProps} />

			<ToastContainer />
		</SSRProvider>
	);
};

export default MyApp;
