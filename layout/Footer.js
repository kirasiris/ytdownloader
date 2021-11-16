import Link from "next/link";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { APP_NAME, KEVINFONSECA_URL } from "@/config";

const Footer = () => {
	return (
		<footer className="align-items-center d-flex flex-wrap justify-content-between py-3">
			<Container fluid>
				<Col md={4} className="align-items-center d-flex">
					<Link href="/">
						<a className="lh-1 me-1 text-decoration-none text-muted">
							{APP_NAME}
						</a>
					</Link>
					<span className="text-muted">
						<i className="fa fa-code me-1" id="fa-code" aria-hidden="true" />
						made with
						<i
							className="fa fa-heart me-1 ms-1"
							id="fa-heart"
							aria-hidden="true"
						/>
						&amp; ☕ by
						<a
							href={`${KEVINFONSECA_URL}`}
							target="_blank"
							rel="noopener noreferrer"
							className="ms-1"
						>
							Kevin
						</a>
					</span>
				</Col>
			</Container>
		</footer>
	);
};

export default Footer;
