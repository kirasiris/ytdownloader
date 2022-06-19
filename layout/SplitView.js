import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
// ACTIONS
// HELPERS
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Carousel from "react-bootstrap/Carousel";
import Ratio from "react-bootstrap/Ratio";
import DownloadsModal from "@/layout/DownloadsModal";

const SplitView = ({ myVideo = null, video = null, objects = [] }) => {
	const [keyword, setKeyword] = useState("");
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(objects);
	}, [objects]);

	useEffect(() => {
		if (keyword !== "") {
			const result = objects.filter((object) => {
				return object.title.toLowerCase().startsWith(keyword.toLowerCase());
			});
			setList(result);
		} else {
			setList(objects);
		}
	}, [keyword]);

	const handleChange = () => (e) => {
		e.preventDefault();
		setKeyword(e.target.value);
	};

	return (
		<div className="p-5 bg-light">
			<Container fluid className="py-5">
				<Row>
					<Col xl={6} className="mb-3">
						<Tabs defaultActiveKey="video-url" variant="pills" className="mb-1">
							<Tab eventKey="video-url" title="Video">
								<Ratio aspectRatio="16x9">
									<embed
										src={
											myVideo?.videoEmbedUrl
												? myVideo?.videoEmbedUrl
												: video?.videoEmbedUrl
										}
									/>
								</Ratio>
								<a
									href={`${
										myVideo?.videoFetchedUrl
											? myVideo?.videoFetchedUrl
											: video?.videoFetchedUrl
									}`}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-sm btn-link"
								>
									Original Video:
									{myVideo?.videoFetchedUrl
										? myVideo?.videoFetchedUrl
										: video?.videoFetchedUrl}
								</a>
							</Tab>
							<Tab eventKey={`thumbnails`} title="Thumbnails">
								{myVideo?.thumbnails?.length > 0 ? (
									<Carousel>
										{myVideo?.thumbnails.map((thumbnail, index) => (
											<Carousel.Item key={index}>
												<img src={`${thumbnail}`} className="d-block w-100" />
											</Carousel.Item>
										))}
									</Carousel>
								) : video?.thumbnails?.length > 0 ? (
									<Carousel>
										{video?.thumbnails.map((thumbnail, index) => (
											<Carousel.Item key={index}>
												<img src={`${thumbnail}`} className="d-block w-100" />
											</Carousel.Item>
										))}
									</Carousel>
								) : (
									<p>Nothing to show</p>
								)}
							</Tab>
						</Tabs>
					</Col>
					<Col xl={6}>
						<Form.Control
							type="text"
							placeholder="Search..."
							name="keyword"
							id="keyword"
							onChange={handleChange("keyword")}
							value={keyword}
							className="mb-3"
						/>
						{list.length > 0 && (
							<>
								<hr />
								<h2>Videos found ({list.length})...</h2>
								<hr />
							</>
						)}
						<Card className="list-container">
							{list?.length > 0 ? (
								<ListGroup variant="flush">
									{list?.map((video, index) => (
										<ListGroup.Item key={`${video?._id}`}>
											<p className="h6">
												<Link
													href={`/videos/${video?._id}/${video?.videoId}/${video?.slug}`}
												>
													{`${video?.title}-${video?.videoId}`}
												</Link>
											</p>
											<ButtonGroup className="mb-2">
												<Button type="button" variant="light" size="sm">
													<i aria-hidden className="fas fa-thumbs-up me-1" />
													{video?.likes}
												</Button>
												<Button type="button" variant="light" size="sm">
													<i aria-hidden className="fas fa-thumbs-down me-1" />
													{video?.dislikes}
												</Button>
												<Button type="button" variant="light" size="sm">
													<i aria-hidden className="fas fa-tag me-1" />
													{video?.category}
												</Button>
												<Button type="button" variant="light" size="sm">
													<i aria-hidden className="fas fa-eye me-1" />
													{video?.views}
												</Button>
												<Button type="button" variant="light" size="sm">
													<i aria-hidden className="fas fa-clock me-1" />
													Time left:
													{/* {CountDownTimer(video?.createdAt, "countdown")} */}
													<div id="countdown"></div>
												</Button>
											</ButtonGroup>
											<audio controls style={{ backgroundColor: "#f1f3f4" }}>
												<source src={`${video?.audioOnly?.url}`} />
											</audio>
											<DownloadsModal video={video} />
										</ListGroup.Item>
									))}
								</ListGroup>
							) : (
								<Alert variant={`danger`} className="m-0 rounded-0">
									Nothing found
								</Alert>
							)}
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SplitView;
