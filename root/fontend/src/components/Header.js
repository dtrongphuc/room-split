import React from "react";
import { Navbar, Image, Dropdown } from "react-bootstrap";
import "./Header.css";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { BrowserRouter as Router, Link } from "react-router-dom";

const CustomToggle = React.forwardRef(({ children, onClick }) => (
	<span
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
	>
		{children}
	</span>
));
export default class Header extends React.Component {
	render() {
		return (
			<Router>
				<Navbar className="header shadow-sm">
					<Navbar.Brand
						className="text text-dark"
						href="/"
						style={{ cursor: "pointer" }}
					>
						<Link to="/" className="text text-decoration-none">
							Trang chủ
						</Link>
					</Navbar.Brand>
					<div className="current-user ml-auto">
						<Dropdown drop={"left"}>
							<Dropdown.Toggle
								id="dropdown-user"
								as={CustomToggle}
							>
								<Image
									style={{ cursor: "pointer" }}
									src="https://picsum.photos/id/1011/128/128"
									width={32}
									roundedCircle
								/>
							</Dropdown.Toggle>
							<DropdownMenu>
								<Dropdown.Item>
									<Link
										to="/logout"
										className="text text-decoration-none"
									>
										Đăng xuất
									</Link>
								</Dropdown.Item>
							</DropdownMenu>
						</Dropdown>
					</div>
				</Navbar>
			</Router>
		);
	}
}
