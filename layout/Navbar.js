import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import "../node_modules/nprogress/nprogress.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";

import ContactFormModal from "./ContactFormModal";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Menu = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container fluid>
				<Link href="/" passHref>
					<a className="pt-0 navbar-brand">
						<Image
							alt=""
							src="/logo.svg"
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>
						{process.env.NEXT_PUBLIC_WEBSITE_NAME}
					</a>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav>
						<Link href="/about" passHref>
							<a className="nav-link">About</a>
						</Link>
						<Link href="/blogs" passHref>
							<a className="nav-link">Blog</a>
						</Link>
						<ContactFormModal as={`button`} />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
