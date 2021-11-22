import { useState } from "react";
// ACTIONS
// HELPERS
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const DownloadsModal = ({ video }) => {
	const [displayModal, setDisplayModal] = useState(false);

	return (
		<>
			<a
				href={`${video.videoToDownload.url}`}
				className={`btn btn-sm btn-dark`}
				download
				rel="noopener noreferrer"
			>
				Download
			</a>
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
				<Modal.Body>
					{video.text}
					<hr />
					<h2 className="display-6">More downloading options below:</h2>
					<ButtonGroup>
						<>
							<a
								href={`${video.videoOnly.url}`}
								className={`btn btn-sm btn-dark`}
								download
								rel="noopener noreferrer"
							>
								Download Video ONLY
							</a>
							<a
								href={`${video.audioOnly.url}`}
								className={`btn btn-sm btn-dark`}
								download
								rel="noopener noreferrer"
							>
								Download Audio ONLY
							</a>
						</>
					</ButtonGroup>
				</Modal.Body>
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
