import { useState } from "react";
// HELPERS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const FormJumbotron = ({ videoUrl, setUrl, setObjects }) => {
	const [submitButtonText, setButtonText] = useState(`Search`);
	const [error, setError] = useState(false);
	const initLookOut = async (e) => {
		e.preventDefault();
		setButtonText(`Searching`);
		await createYouTube(videoUrl)()
			.then((result) => {
				setButtonText(`Result`);
				setUrl(result.data.videoEmbedUrl);
				setObjects([result.data, ...videos]);
				resetForm();
			})
			.catch((err) => {
				setError(err);
			});
	};

	const resetForm = () => {
		setUrl(``);
	};

	const handleChange = () => (e) => {
		setUrl(e.target.value);
	};

	return (
		<div className="p-5">
			<Container fluid className="py-5">
				<Form onSubmit={initLookOut} className="w-100">
					<Form.Control
						type={`text`}
						placeholder={`Paste the YouTube URL...`}
						name={`video_url`}
						id={`keywrod`}
						onChange={handleChange(`video_url`)}
						value={videoUrl}
					/>
					<div className="mt-3">
						<Button
							type={`submit`}
							variant={`dark`}
							size={`sm`}
							disabled={videoUrl.length > 0 ? !true : !false}
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
