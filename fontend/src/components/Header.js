import React from "react";
import { Navbar, Image } from "react-bootstrap";
import "./Header.css";

export default class Header extends React.Component {
	render() {
		return (
			<Navbar className="header shadow-sm">
				<Navbar.Brand className="text text-dark">
					Trang chủ
				</Navbar.Brand>
				<div className="current-user ml-auto">
					<Image
						src="https://picsum.photos/id/1011/128/128"
						width={32}
						roundedCircle
					/>
				</div>
			</Navbar>
		);
	}
}
