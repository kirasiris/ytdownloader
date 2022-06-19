import Link from "next/link";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import useDarkMode from "use-dark-mode";
import { APP_NAME, KEVINFONSECA_URL } from "@/config";

const Footer = () => {
	const darkMode = useDarkMode(false, {
		classNameDark: "dark-mode",
		classNameLight: "light-mode",
		element: typeof window !== "undefined" && document.body,
		storageKey: "darkMode",
	});
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
					<div className="custom-control custom-switch">
						<input
							type="checkbox"
							className="custom-control-input"
							id="dmcheck"
							checked={darkMode.value}
							onChange={darkMode.toggle}
						/>
						<label className="custom-control-label" htmlFor="dmcheck">
							<i className={`far fa-moon`} aria-hidden />
						</label>
					</div>
				</Col>
			</Container>
		</footer>
	);
};

export default Footer;
