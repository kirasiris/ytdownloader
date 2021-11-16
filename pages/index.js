import { useEffect, useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { toast } from "react-toastify";
import ReactHtmlParser from "react-html-parser";
// ACTIONS
import {
	getYouTubes,
	getYoutTubeVideoInfo,
	getYoutTubeVideoDownload,
} from "@/actions/youtube";
// HELPERS
import { APP_NAME, APP_DESCRIPTION } from "@/config";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Ratio from "react-bootstrap/Ratio";
import Tabs from "react-bootstrap/Tabs";
import Layout from "@/layout/Layout";

const Home = ({ router }) => {
	// const [history, setHistory] = useState([]);
	// const [download, setDownload] = useState([]);
	// const [video_url, setVideoUrl] = useState(``);
	// const [finalVideo, setFinalVideoToDownload] = useState(``);
	// const [highestQualityVideo, setHighestQualityVideo] = useState(``);
	// const [highestQualityAudio, setHighestQualityAudio] = useState(``);
	// const [submitButtonText, setButtonText] = useState(`Download`);
	// const [error, setError] = useState(false);
	// const [videoData, setVideoData] = useState({
	// 	videoTitle: `Uknown title`,
	// 	videoDescription: `Uknown description`,
	// 	videoUrl: ``,
	// 	videoEmbedUrl: ``,
	// 	videoThumbnail: ``,
	// 	videoAuthor: `Unknown author`,
	// 	videoAuthorLink: `#!`,
	// 	videoChannelUrl: `#!`,
	// 	videoCategory: `Uknown`,
	// 	videoLikes: 0,
	// 	videoDislikes: 0,
	// 	videoKeywords: [],
	// 	videoGame: {
	// 		game: ``,
	// 		game_url: `#!`,
	// 		category: `Uknown`,
	// 		category_url: `#!`,
	// 		thumbnails: [],
	// 		year: `0000`,
	// 	},
	// 	videoViewCounts: 0,
	// });

	// useEffect(() => {
	// 	const videoId = router.query.video_url;

	// 	if (videoId) {
	// 		const historyData = JSON.parse(
	// 			window.localStorage.getItem(`video#${videoId.split("v=")[1]}`)
	// 		);

	// 		const downloadData = JSON.parse(
	// 			window.localStorage.getItem(`download#${videoId.split("v=")[1]}`)
	// 		);

	// 		setVideoData({
	// 			videoTitle: historyData?.title, // Done
	// 			videoDescription: historyData?.description, // Done
	// 			videoUrl: historyData?.video_url, // Done
	// 			videoEmbedUrl: historyData?.embed?.iframeUrl,
	// 			videoThumbnail: historyData?.thumbnails[0].url, // Done
	// 			videoAuthor: historyData?.author?.name, // Done
	// 			videoAuthorLink: historyData?.author?.user_url, // Done
	// 			videoChannelUrl: historyData?.author?.channel_url,
	// 			videoCategory: historyData?.category, // Done
	// 			videoLikes: historyData?.likes, // Done
	// 			videoDislikes: historyData?.dislikes, // Done
	// 			videoKeywords: historyData?.videoKeywords,
	// 			videoGame: {
	// 				game: historyData?.media?.game,
	// 				game_url: historyData?.media?.game_url,
	// 				category: historyData?.media?.category,
	// 				category_url: historyData?.media?.category_url,
	// 				thumbnails: historyData?.media?.thumbnails,
	// 				year: historyData?.media?.year,
	// 			},
	// 			videoViewCounts: historyData?.viewCount, // Done
	// 		});
	// 		setFinalVideoToDownload(downloadData?.finalVideo);
	// 		setHighestQualityVideo(downloadData?.highestQualityOnlyVideo);
	// 		setHighestQualityAudio(downloadData?.highestQualityOnlyAudio);
	// 	}
	// }, [router]);

	// useEffect(() => {
	// 	const moreHistory = Object.keys(window.localStorage)
	// 		.filter((key, index) => {
	// 			return key.indexOf("video#") == 0;
	// 		})
	// 		.reduce((newData, k) => {
	// 			newData[k] = JSON.parse(window.localStorage[k]);
	// 			return newData;
	// 		}, {});
	// 	moreHistory && setHistory(moreHistory);
	// }, []);

	// const handleChange = () => (e) => {
	// 	setVideoUrl(e.target.value);
	// };

	// const resetForm = () => {
	// 	setVideoUrl(``);
	// };

	// const initLookOut = async (e) => {
	// 	e.preventDefault();
	// 	setButtonText(`Looking for it...`);
	// 	await getYoutTubeVideoInfo(`youtube/getinfo?video_url=${video_url}`)()
	// 		.then((r) => {
	// 			setButtonText(`Info found`);
	// 			setVideoData({
	// 				videoTitle: r?.data?.videoDetails?.title,
	// 				videoDescription: r?.data?.videoDetails?.description,
	// 				videoUrl: r?.data?.videoDetails?.video_url,
	// 				videoEmbedUrl: r?.data?.videoDetails?.embed?.iframeUrl,
	// 				videoThumbnail: r?.data?.videoDetails?.thumbnails,
	// 				videoAuthor: r?.data?.videoDetails?.author?.name,
	// 				videoAuthorLink: r?.data?.videoDetails?.author?.user_url,
	// 				videoChannelUrl: r?.data?.videoDetails?.author?.channel_url,
	// 				videoCategory: r?.data?.videoDetails?.category,
	// 				videoLikes: r?.data?.videoDetails?.likes,
	// 				videoDislikes: r?.data?.videoDetails?.dislikes,
	// 				videoKeywords: r?.data?.videoDetails?.keywords,
	// 				videoGame: {
	// 					game: r?.data?.videoDetails?.media?.game,
	// 					game_url: r?.data?.videoDetails?.media?.game_url,
	// 					category: r?.data?.videoDetails?.media?.category,
	// 					category_url: r?.data?.videoDetails?.media?.category_url,
	// 					thumbnails: r?.data?.videoDetails?.media?.thumbnails,
	// 					year: r?.data?.videoDetails?.media?.year,
	// 				},
	// 				videoViewCounts: r?.data?.videoDetails?.viewCount,
	// 			});

	// 			setFinalVideoToDownload(r?.extradata?.finalVideo);
	// 			setHighestQualityVideo(r?.extradata?.highestQualityOnlyVideo);
	// 			setHighestQualityAudio(r?.extradata?.highestQualityOnlyAudio);

	// 			setHistory(
	// 				window.localStorage.setItem(
	// 					`video#${r?.data?.videoDetails?.videoId}`,
	// 					JSON.stringify(r?.data?.videoDetails)
	// 				)
	// 			);

	// 			setDownload(
	// 				window.localStorage.setItem(
	// 					`download#${r?.data?.videoDetails?.videoId}`,
	// 					JSON.stringify(r?.extradata)
	// 				)
	// 			);

	// 			resetForm();
	// 		})
	// 		.catch((error) => {
	// 			toast.error(error);
	// 			setError(true);
	// 		});
	// };

	// const initDownload = async (e) => {
	// 	e.preventDefault();
	// 	getYoutTubeVideoDownload();
	// };

	// const clearConsole = () => {
	// 	window != undefined && localStorage.clear();
	// 	setHistory([]);
	// 	setVideoData({
	// 		videoTitle: `Uknown title`,
	// 		videoDescription: `Uknown description`,
	// 		videoUrl: ``,
	// 		videoEmbedUrl: ``,
	// 		videoThumbnail: ``,
	// 		videoAuthor: `Unknown author`,
	// 		videoAuthorLink: `#!`,
	// 		videoChannelUrl: `#!`,
	// 		videoCategory: `Uknown`,
	// 		videoLikes: 0,
	// 		videoDislikes: 0,
	// 		videoKeywords: [],
	// 		videoGame: {
	// 			game: ``,
	// 			game_url: `#!`,
	// 			category: `Uknown`,
	// 			category_url: `#!`,
	// 			thumbnails: [],
	// 			year: `0000`,
	// 		},
	// 		videoViewCounts: 0,
	// 	});
	// 	resetForm();
	// };

	// const isActive = (router, path) => {
	// 	if (router.path === path) {
	// 		return {
	// 			color: "#ffffff",
	// 			backgroundColor: "#007bff",
	// 		};
	// 	}
	// };

	const [video_url, setVideoUrl] = useState(``);
	const [videos, setVideos] = useState([]);
	const [submitButtonText, setButtonText] = useState(`Search`);
	const [error, setError] = useState(false);
	const [displayModal, setDisplayModal] = useState(false);

	const initLookOut = async (e) => {
		e.preventDefault();
		setButtonText(`Searching`);
		await getYoutTubeVideoInfo(`?video_url=${video_url}`)()
			.then((result) => {
				console.log(result);
				setButtonText(`Result`);
				// setVideos([result.data, ...videos]);
				resetForm();
			})
			.catch((err) => {
				setError(err);
			});
	};
	const initDownload = async (e) => {
		e.preventDefault();
	};
	const resetForm = () => {
		setVideoUrl(``);
	};

	const handleChange = () => (e) => {
		setVideoUrl(e.target.value);
	};

	return (
		<Layout title={`Get Started`}>
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
			<div className="p-5">
				<Container fluid className="py-5">
					<Form onSubmit={initLookOut} className="w-100">
						<Form.Control
							type={`text`}
							placeholder={`Paste the YouTube URL...`}
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
			<div className="p-5 bg-light">
				<Container fluid className="py-5">
					<Row>
						<Col xl={6} className="mb-3">
							<Ratio aspectRatio="16x9">
								<embed src={`https://www.youtube.com/embed/mK7lDooAGJw`} />
							</Ratio>
						</Col>
						<Col xl={6}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<p className="h6">Title</p>
										<audio controls style={{ backgroundColor: "#f1f3f4" }}>
											<source
												src={`https://samplelib.com/lib/preview/mp3/sample-15s.mp3`}
											/>
										</audio>

										<Button
											type="submit"
											variant="dark"
											size="sm"
											className="m-1"
										>
											Download
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
											<Modal.Body>
												Woohoo, you're reading this text in a modal!
											</Modal.Body>
											<Modal.Footer>
												<Button
													variant="secondary"
													onClick={() => setDisplayModal(false)}
												>
													Close
												</Button>
											</Modal.Footer>
										</Modal>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>

			{/* <div className="main-container">
				<div className="localstorage-history">
					<ListGroup className={`border-0`}>
						<a
							className={`list-group-item list-group-item-dark rounded-0 border-0`}
							style={isActive(router, `/`)}
						>
							History
						</a>
						<Button onClick={clearConsole}>Clear History</Button>
						{history !== undefined &&
							history !== null &&
							Object.entries(history).map((h, index) => (
								<Link key={h[0]} href={`/?video_url=${h[1]?.video_url}`}>
									<a
										className={`list-group-item rounded-0 border-0`}
										style={isActive(router, `/?video_url=${h[1]?.video_url}`)}
									>
										{h[1]?.title}
									</a>
								</Link>
							))}
					</ListGroup>
				</div>
				<div className="resizer" id="dragMe"></div>
				<div className="form-container">
					<Row className="m-auto">
						<div className="p-5 mb-4 bg-light">
							<Container fluid className="py-5">
								<h1 className="display-1 fw-bold">{APP_NAME}</h1>
								<h2 className="display-5 fw-bold">{APP_DESCRIPTION}</h2>
								<p className="col-md-8 fs-4">
									You will be able to download the video once the data is
									fetched from the server by exploring the tabs on the right
									hand side
								</p>
							</Container>
						</div>
						<Col xl={12} className="mb-3">
							<Form onSubmit={initLookOut} className="w-100">
								<Form.Control
									type={`text`}
									placeholder={`Paste the YouTube URL...`}
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
						</Col>
						<Col xl={6}>
							<h2>Video Data</h2>
							{videoData.videoUrl !== undefined &&
								videoData.videoUrl !== null &&
								videoData.videoUrl !== `` && (
									<>
										<Ratio aspectRatio="16x9">
											<embed src={`${videoData?.videoEmbedUrl}`} />
										</Ratio>
										<hr />
									</>
								)}
							<h5>
								<a
									href={`${videoData.videoUrl}`}
									target="_blank"
									rel="noreferrer noopener"
								>
									{videoData.videoTitle}
								</a>
							</h5>
							<hr />
							<a
								href={`${videoData.videoAuthorLink}`}
								target="_blank"
								rel="noreferrer noopener"
								className="btn btn-sm btn-outline-dark me-1"
							>
								<i className="fas fa-user me-1" />
								{videoData.videoAuthor}
							</a>
							<a href="#!" className="btn btn-sm btn-outline-dark me-1">
								<i className="fas fa-tag me-1" />
								{videoData.videoCategory}
							</a>
							<a href="#!" className="btn btn-sm btn-outline-dark me-1">
								<i className="fas fa-thumbs-up me-1" />
								{videoData.videoLikes}
							</a>
							<a href="#!" className="btn btn-sm btn-outline-dark me-1">
								<i className="fas fa-thumbs-down me-1" />
								{videoData.videoDislikes}
							</a>
							<a href="#!" className="btn btn-sm btn-outline-dark me-1">
								<i className="fas fa-eye me-1" />
								{videoData.videoViewCounts}
							</a>

							{videoData.videoDescription && (
								<>
									<hr />
									<div
										className={`fetchHtml`}
										dangerouslySetInnerHTML={{
											__html: ReactHtmlParser(videoData.videoDescription),
										}}
									/>
									<hr />
								</>
							)}
							{videoData?.videoKeywords?.map((r) => (
								<a
									key={r}
									href="#!"
									className="btn btn-sm btn-outline-dark me-1 mb-1"
								>
									<i className="fas fa-tags me-1" />
									{r}
								</a>
							))}
						</Col>
						<Col xl={6}>
							<h2>Data</h2>
							<Tabs
								defaultActiveKey="download-data"
								id="what-up-bitch"
								className="mb-3"
							>
								{finalVideo?.url !== undefined &&
									finalVideo?.url !== null &&
									finalVideo?.url !== `` && (
										<Tabs.Tab eventKey="download-data" title="Download Data">
											<h2>Download</h2>
											<Tabs
												defaultActiveKey="video"
												id="what-up-bitch"
												className="mb-3"
											>
												<Tabs.Tab eventKey="video" title="Video">
													<a
														href={`${finalVideo?.url}`}
														download
														className={`btn btn-sm btn-dark me-1`}
														target="_self"
													>
														Download Video - CLICK ME!
													</a>
													<hr />
													<Ratio aspectRatio="16x9">
														<embed src={`${finalVideo?.url}`} />
													</Ratio>
												</Tabs.Tab>
												<Tabs.Tab eventKey="video-only" title="Video ONLY">
													<a
														href={`${highestQualityVideo.url}`}
														download
														className={`btn btn-sm btn-dark me-1`}
														target="_self"
													>
														Download Video ONLY - CLICK ME!
													</a>
													<hr />
													<Ratio aspectRatio="16x9">
														<embed src={`${highestQualityVideo.url}`} />
													</Ratio>
												</Tabs.Tab>
												<Tabs.Tab eventKey="audio-only" title="Audio ONLY">
													<a
														href={`${highestQualityAudio.url}`}
														download
														className={`btn btn-sm btn-dark me-1`}
														target="_self"
													>
														Download Audio ONLY - CLICK ME!
													</a>
													<hr />
													<audio controls crossOrigin>
														<source src={`${highestQualityAudio.url}`} />
													</audio>
												</Tabs.Tab>
											</Tabs>
										</Tabs.Tab>
									)}
								{videoData.videoGame.game !== null &&
									videoData.videoGame.game !== undefined &&
									videoData.videoGame.game !== `` && (
										<Tabs.Tab eventKey="videogame-data" title="Videogame Data">
											<h2>Videogame</h2>
											<h5>
												<a
													href={`${videoData.videoGame.game_url}`}
													target="_blank"
													rel="noreferrer noopener"
												>
													{videoData.videoGame.game}
												</a>
											</h5>
											<hr />
											<a
												href={`${videoData.videoGame.category_url}`}
												target="_blank"
												rel="noreferrer noopener"
												className="btn btn-sm btn-outline-dark me-1"
											>
												<i className="fas fa-tag me-1" />
												{videoData.videoGame.category}
											</a>
											<a href="#!" className="btn btn-sm btn-outline-dark me-1">
												<i className="fas fa-clock me-1" />
												{videoData.videoGame.year}
											</a>
										</Tabs.Tab>
									)}
							</Tabs>
						</Col>
					</Row>
				</div>
			</div> */}
		</Layout>
	);
};

export default withRouter(Home);
