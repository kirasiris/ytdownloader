// HELPERS
import { APP_NAME, APP_DESCRIPTION } from "@/config";
import Container from "react-bootstrap/Container";

const JumbotronHeader = () => {
	return (
		<div className="p-5 bg-light">
			<Container fluid className="py-5">
				<h1 className="display-1 fw-bold">{APP_NAME}</h1>
				<h2 className="display-5 fw-bold">{APP_DESCRIPTION}</h2>
				<p className="col-md-8 fs-4">
					You will be able to download the audio by clicking on the Download
					button, you can also find more options by triggering the More button
				</p>
			</Container>
		</div>
	);
};

export default JumbotronHeader;
