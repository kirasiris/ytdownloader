import { useState } from "react";
// ACTION
import { createYouTube } from "@/actions/youtube";
// HELPERS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const FormJumbotron = ({ setObject, setObjects, objects }) => {
	const [videoData, setVideoData] = useState({
		video_url: ``,
	});

	const { video_url } = videoData;

	const [submitButtonText, setButtonText] = useState(`Search`);
	const [error, setError] = useState(false);
	const initLookOut = async (e) => {
		e.preventDefault();
		setButtonText(`Searching...`);
		await createYouTube(videoData)()
			.then((result) => {
				setButtonText(`Result`);
				setObject(result.data);
				setObjects([result.data, ...objects]);
				setVideoData({
					video_url: result.data.videoEmbedUrl,
				});
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
		});
	};

	return (
		<div className="p-5">
			<Container fluid className="py-5">
				<Form onSubmit={initLookOut} className="w-100">
					<Form.Control
						type={`text`}
						placeholder={`https://www.youtube.com/watch?v=jDWahg4odAY`}
						name={`video_url`}
						id={`keywrod`}
						onChange={handleChange(`video_url`)}
						value={video_url}
					/>
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
