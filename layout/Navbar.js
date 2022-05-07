import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import { APP_NAME, KEVINFONSECA_URL } from "@/config";
import ContactFormModal from "./ContactFormModal";

const Menu = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container fluid>
				<Navbar.Brand href="/" className="pt-0">
					<Image
						alt=""
						src="/logo.svg"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>
					{APP_NAME}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav>
						<Link href="/about" passHref>
							<a className="nav-link">About</a>
						</Link>
						<ContactFormModal as={`button`} />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
