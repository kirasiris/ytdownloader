import { useState } from "react";
import axios from "axios";
// HELPERS
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";

const FormJumbotron = ({ setObject, setObjects, objects }) => {
	const [videoData, setVideoData] = useState({
		video_url: ``,
		download_video: false,
	});

	const { video_url, download_video } = videoData;

	const [submitButtonText, setButtonText] = useState(`Search`);
	const [, setError] = useState(false);
	const initLookOut = async (e) => {
		e.preventDefault();
		setButtonText(`Searching...`);
		await axios
			.post(`/extras/youtube/getinfo`, videoData)
			.then((result) => {
				setButtonText(`Result`);
				setObject(result.data.data);
				setObjects([result.data.data, ...objects]);
				setVideoData({
					video_url: result.data.data.videoEmbedUrl,
				});
				toast.success("Item created");
				resetForm();
			})
			.catch((err) => {
				setError(err);
			});
	};

	const handleChange = (name) => (e) => {
		setVideoData({ ...videoData, [name]: e.target.value });
	};

	const resetForm = () => {
		setVideoData({
			video_url: ``,
			download_video: false,
		});
	};

	return (
		<div className="p-5 form-jumbotron">
			<Container fluid className="py-5">
				<Form onSubmit={initLookOut} className="w-100">
					<Row>
						<Col xl={9}>
							<Form.Label htmlFor={`video_url`}>YouTube URL</Form.Label>
							<Form.Control
								type={`text`}
								placeholder={`https://www.youtube.com/watch?v=jDWahg4odAY`}
								name={`video_url`}
								id={`video_url`}
								onChange={handleChange(`video_url`)}
								value={video_url}
							/>
						</Col>
						<Col xl={3}>
							<Form.Label htmlFor={`download_video`}>
								Download video?
							</Form.Label>
							<Form.Control
								as={`select`}
								aria-label={`download_video`}
								aria-describedby={`download_video`}
								name={`download_video`}
								id={`download_video`}
								value={download_video}
								onChange={handleChange("download_video")}
								required
							>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</Form.Control>
						</Col>
					</Row>

					<div className="mt-3">
						<Button
							type={`submit`}
							variant={`dark`}
							size={`sm`}
							disabled={video_url.length > 0 ? !true : !false}
							className={`float-start`}
						>
							{submitButtonText}
						</Button>
						<Button
							type={`reset`}
							variant={`secondary`}
							size={`sm`}
							className={`float-end`}
							onClick={resetForm}
						>
							Reset
						</Button>
					</div>
				</Form>
			</Container>
		</div>
	);
};

export default FormJumbotron;
