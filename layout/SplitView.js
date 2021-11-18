import Link from "next/link";
// ACTIONS
// HELPERS
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Ratio from "react-bootstrap/Ratio";
import Alert from "react-bootstrap/Alert";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Carousel from "react-bootstrap/Carousel";
import DownloadsModal from "@/layout/DownloadsModal";

const SplitView = ({ videoUrl, thumbnails, objects }) => {
	return (
		<div className="p-5 bg-light">
			<Container fluid className="py-5">
				<Row>
					<Col xl={6} className="mb-3">
						<Tabs defaultActiveKey="videoUrl" variant="pills" className="mb-1">
							<Tab eventKey="videoUrl" title="Video">
								<Ratio aspectRatio="16x9">
									<embed src={`${videoUrl}`} />
								</Ratio>
							</Tab>
							<Tab eventKey="Thumbnails" title="Thumbnails">
								{thumbnails?.length > 0 ? (
									<Carousel>
										{thumbnails.map((thumbnail, index) => (
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
						<Card>
							{objects.length > 0 ? (
								<ListGroup variant="flush">
									{objects.map((video, index) => (
										<ListGroup.Item key={`${video._id}`}>
											<p className="h6">
												<Link
													href={`/videos/${video._id}/${video.videoId}/${video.slug}`}
												>
													{`${video.title}-${video.videoId}`}
												</Link>
											</p>
											<ButtonGroup className="mb-2">
												<Button type="button" variant="light" size="sm">
													<i className="fas fa-thumbs-up me-1" />
													{video.likes}
												</Button>
												<Button type="button" variant="light" size="sm">
													<i className="fas fa-thumbs-down me-1" />
													{video.dislikes}
												</Button>
												<Button type="button" variant="light" size="sm">
													<i className="fas fa-tag me-1" />
													{video.category}
												</Button>
												<Button type="button" variant="light" size="sm">
													<i className="fas fa-eye me-1" />
													{video.views}
												</Button>
											</ButtonGroup>
											<audio controls style={{ backgroundColor: "#f1f3f4" }}>
												<source src={`${video.audioOnly.url}`} />
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
