import React from "react";
import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./Header.css";

export default class Header extends React.Component {
	render() {
		return (
			<Router>
				<Navbar className="header shadow-sm">
					<Navbar.Brand
						className="text text-dark"
						style={{ cursor: "pointer" }}
					>
						<Link to="/" className="text text-decoration-none">
							Trang chủ
						</Link>
					</Navbar.Brand>
					<div className="current-user ml-auto">
						<Link
							to="/logout"
							className="text text-decoration-none"
						>
							Đăng xuất
						</Link>
					</div>
				</Navbar>
			</Router>
		);
	}
}
