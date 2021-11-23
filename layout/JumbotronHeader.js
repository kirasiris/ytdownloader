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
					You will be able to download the video (on the best quality found) by
					clicking on the Download button, you can also find more options by
					triggering the More button
				</p>
				<p>
					Even tho using this website is totally free, there's a limit that once
					reached you will need to wait at least 30mins before being able to
					dowload again. That's on{" "}
					<a
						href="https://github.com/fent/node-ytdl-core#limitations"
						target="_blank"
						rel="noopener noreferrer"
					>
						YouTube's policy
					</a>
					, not me!
				</p>
				<p>
					As mentioned in the GitHub page, each link <b>ONLY</b> last about
					6hrs!
				</p>
			</Container>
		</div>
	);
};

export default JumbotronHeader;
