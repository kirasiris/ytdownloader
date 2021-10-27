import { useEffect, useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { toast } from "react-toastify";
import ReactHtmlParser from "react-html-parser";
// ACTIONS
import { getYoutTubeVideoInfo } from "@/actions/youtube";
// HELPERS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Layout from "@/layout/Layout";

const Home = ({ router }) => {
	const apiUrl = `http://localhost:5000/api/v1/`;
	const [history, setHistory] = useState([]);
	const [singleHistory, setSingleHistory] = useState();
	const [video_url, setVideoUrl] = useState(``);
	const [submitButtonText, setButtonText] = useState(`Download`);
	const [error, setError] = useState(false);
	const [videoData, setVideoData] = useState({
		videoTitle: `Uknown title`,
		videoDescription: `Uknown description`,
		videoUrl: ``,
		videoThumbnail: ``,
		videoAuthor: `Unknown author`,
		videoAuthorLink: `#!`,
		videoChannelUrl: `#!`,
		videoCategory: `Uknown`,
		videoLikes: 0,
		videoDislikes: 0,
		videoKeywords: [],
		videoGame: {
			game: `Uknown`,
			game_url: `#!`,
			category: `Uknown`,
			category_url: `#!`,
			thumbnails: [],
			year: `0000`,
		},
		videoViewCounts: 0,
	});

	useEffect(() => {
		const videoId = router.query.video_url;

		if (videoId) {
			const historyData = JSON.parse(
				window.localStorage.getItem(`video#${videoId.split("v=")[1]}`)
			);

			setVideoData({
				videoTitle: historyData?.title, // Done
				videoDescription: historyData?.description, // Done
				videoUrl: historyData?.video_url, // Done
				videoThumbnail: historyData?.thumbnails[0].url, // Done
				videoAuthor: historyData?.author?.name, // Done
				videoAuthorLink: historyData?.author?.user_url, // Done
				videoChannelUrl: historyData?.author?.channel_url,
				videoCategory: historyData?.category, // Done
				videoLikes: historyData?.likes, // Done
				videoDislikes: historyData?.dislikes, // Done
				videoKeywords: historyData?.videoKeywords,
				videoGame: {
					game: historyData?.media?.game,
					game_url: historyData?.media?.game_url,
					category: historyData?.media?.category,
					category_url: historyData?.media?.category_url,
					thumbnails: historyData?.media?.thumbnails,
					year: historyData?.media?.year,
				},
				videoViewCounts: historyData?.viewCount, // Done
			});
		}
	}, [router]);

	useEffect(() => {
		const moreHistory = Object.keys(window.localStorage)
			.filter((key, index) => {
				return key.indexOf("video#") == 0;
			})
			.reduce((newData, k) => {
				newData[k] = JSON.parse(window.localStorage[k]);
				return newData;
			}, {});
		moreHistory && setHistory(moreHistory);
	}, []);

	const handleChange = () => (e) => {
		setVideoUrl(e.target.value);
	};

	const resetForm = () => {
		setVideoUrl(``);
	};
	const initDownload = async (e) => {
		e.preventDefault();
		setButtonText(`Looking for it...`);
		await getYoutTubeVideoInfo(
			`${apiUrl}extras/youtube/getinfo?video_url=${video_url}`
		)()
			.then((r) => {
				setButtonText(`Info found`);
				setVideoData({
					videoTitle: r?.data?.videoDetails?.title,
					videoDescription: r?.data?.videoDetails?.description,
					videoUrl: r?.data?.videoDetails?.video_url,
					videoThumbnail: r?.data?.videoDetails?.thumbnails,
					videoAuthor: r?.data?.videoDetails?.author?.name,
					videoAuthorLink: r?.data?.videoDetails?.author?.user_url,
					videoChannelUrl: r?.data?.videoDetails?.author?.channel_url,
					videoCategory: r?.data?.videoDetails?.category,
					videoLikes: r?.data?.videoDetails?.likes,
					videoDislikes: r?.data?.videoDetails?.dislikes,
					videoKeywords: r?.data?.videoDetails?.keywords,
					videoGame: {
						game: r?.data?.videoDetails?.media?.game,
						game_url: r?.data?.videoDetails?.media?.game_url,
						category: r?.data?.videoDetails?.media?.category,
						category_url: r?.data?.videoDetails?.media?.category_url,
						thumbnails: r?.data?.videoDetails?.media?.thumbnails,
						year: r?.data?.videoDetails?.media?.year,
					},
					videoViewCounts: r?.data?.videoDetails?.viewCount,
				});

				// setHistory(
				// 	window.localStorage.setItem(
				// 		`video#${r?.data?.videoDetails?.videoId}`,
				// 		JSON.stringify(r?.data?.videoDetails)
				// 	)
				// );

				// setSingleHistory(
				// 	window.localStorage.setItem(
				// 		`video#${r?.data?.videoDetails?.videoId}`,
				// 		JSON.stringify(r?.data?.videoDetails)
				// 	)
				// );
				console.log("First console: ", history);
				setHistory([
					...window.localStorage.setItem(
						`video#${r?.data?.videoDetails?.videoId}`,
						JSON.stringify(r?.data?.videoDetails)
					),
					...history,
				]);

				console.log("Third console: ", ...history);

				resetForm();
			})
			.catch((error) => {
				toast.error(error);
				setError(true);
			});
	};

	const clearConsole = () => {
		window != undefined && localStorage.clear();
		setHistory([]);
		setVideoData({
			videoTitle: `Uknown title`,
			videoDescription: `Uknown description`,
			videoUrl: ``,
			videoThumbnail: ``,
			videoAuthor: `Unknown author`,
			videoAuthorLink: `#!`,
			videoChannelUrl: `#!`,
			videoCategory: `Uknown`,
			videoLikes: 0,
			videoDislikes: 0,
			videoKeywords: [],
			videoGame: {
				game: `Uknown`,
				game_url: `#!`,
				category: `Uknown`,
				category_url: `#!`,
				thumbnails: [],
				year: `0000`,
			},
			videoViewCounts: 0,
		});
		resetForm();
	};

	const isActive = (router, path) => {
		if (router.path === path) {
			return {
				color: "#ffffff",
				backgroundColor: "#007bff",
			};
		}
	};

	return (
		<Layout title={`Get Started`} action={setHistory}>
			<div className="main-container">
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
						<Col xl={12} className="mb-3">
							<Form onSubmit={initDownload} className="w-100">
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
							{/* <div className="clearfix" />
							<hr />
							<ListGroup className={`border-0`}>
								{formats !== undefined &&
									formats !== null &&
									formats.map((f) => (
										<ListGroup.Item key={f.itag} className={f.itag}>
											{f.itag} | Video Codec: {f.videoCodec} | Video Mimetype:{" "}
											{f.mimeType} | Video Quality:
											{f.qualityLabel} | Video FPS: {f.fps}
										</ListGroup.Item>
									))}
							</ListGroup> */}
						</Col>
						<Col>
							<h2>Video Data</h2>
							{/* <Image alt="" src={`${videoData.videoThumbnail[0].url}`} /> */}
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
							<hr />
							{videoData.videoDescription && (
								<div
									className={`fetchHtml`}
									dangerouslySetInnerHTML={{
										__html: ReactHtmlParser(videoData.videoDescription),
									}}
								/>
							)}
							<hr />
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
						{/* <Col>
							<img
								alt={`${videoData.videoGame.game}`}
								src={`${videoData.videoGame.thumbnails[0]?.url}`}
							/>
						</Col> */}
						<Col>
							<h2>Videogame Data</h2>
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
						</Col>
					</Row>
				</div>
			</div>
		</Layout>
	);
};

export default withRouter(Home);
