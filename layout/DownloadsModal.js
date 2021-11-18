import { useState } from "react";
// ACTIONS
import { downloadYouTube } from "@/actions/youtube";
// HELPERS
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DownloadsModal = ({ video }) => {
	const [downloadButtonText, setDownloadButtonText] = useState(`Download`);
	const [displayModal, setDisplayModal] = useState(false);

	const initdownload = async (e) => {
		e.preventDefault();
		await downloadYouTube(
			`?video_url=${video.videoFetched}&container=mp4&filename=${video.title}`
		)()
			.then(() => {
				setDownloadButtonText(`Downloading`);
			})
			.catch((err) => {
				setError(true);
			});
	};

	return (
		<>
			<Button
				type="submit"
				variant="dark"
				size="sm"
				className="m-1"
				onClick={initdownload}
			>
				{downloadButtonText}
			</Button>
			<Button
				type="button"
				variant="secondary"
				size="sm"
				className="m-1"
				onClick={() => setDisplayModal(true)}
			>
				More
			</Button>
			<Modal
				show={displayModal}
				onHide={() => setDisplayModal(false)}
				size="xl"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<h1 className="display-6">Download Options</h1>
				</Modal.Header>
				<Modal.Body>{video.text}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setDisplayModal(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default DownloadsModal;
