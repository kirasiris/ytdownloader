// HELPERS
import Container from "react-bootstrap/Container";

const JumbotronHeader = () => {
	return (
		<div className="p-5 bg-light">
			<Container fluid className="py-5">
				<h1 className="display-1 fw-bold">
					{process.env.NEXT_PUBLIC_WEBSITE_NAME}
				</h1>
				<h2 className="display-5 fw-bold">
					{process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION}
				</h2>
				<p className="col-md-8 fs-4">
					You will be able to download the video (on the best quality found) by
					clicking on the Download button, you can also find more options by
					triggering the More button
				</p>
				<p>
					Even tho using this website is totally free, there&apos;s a limit that
					once reached you will need to wait at least 30mins before being able
					to dowload again. That&apos;s on{" "}
					<a
						href="https://github.com/fent/node-ytdl-core#limitations"
						target="_blank"
						rel="noopener noreferrer"
					>
						YouTube&apos;s policy
					</a>
					, not me!
				</p>
				<p>
					As mentioned in the GitHub page, each link <b>ONLY</b> last about
					6hrs!
				</p>

				<h3 className="display-6 fw-bold">
					Videos are now downloaded to your Windows OS <code>Downloads</code>{" "}
					folder. However not all videos are going to contain audio; thats on
					the video itself, nothing that I could do!
				</h3>
				<p>All the data gets automatically deleted on the 15 of each month!.</p>
			</Container>
		</div>
	);
};

export default JumbotronHeader;
