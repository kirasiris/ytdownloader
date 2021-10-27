import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import { APP_NAME, KEVINFONSECA_URL } from "@/config";

const Menu = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">
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
					{/* <Nav className="me-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
						<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav> */}
					<Nav>
						<a
							href={`${KEVINFONSECA_URL}`}
							className="nav-link"
							target="_blank"
							rel="noopener noreferrer"
						>
							About Author
						</a>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
