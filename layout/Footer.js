import Link from "next/link";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ToggleTheme from "./ToggleTheme";

const Footer = () => {
	return (
		<footer className="align-items-center d-flex flex-wrap justify-content-between py-3">
			<Container fluid>
				<Col md={4} className="align-items-center d-flex">
					<Link href="/" className="lh-1 me-1 text-decoration-none text-muted">
						{process.env.NEXT_PUBLIC_WEBSITE_NAME}
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
							href={`${process.env.NEXT_PUBLIC_KEVINFONSECA_URL}`}
							target="_blank"
							rel="noopener noreferrer"
							className="ms-1"
						>
							Kevin
						</a>
					</span>
					<div className="custom-control custom-switch">
						<ToggleTheme />
					</div>
				</Col>
			</Container>
		</footer>
	);
};

export default Footer;
