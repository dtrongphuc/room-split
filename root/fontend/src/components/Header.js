import React from "react";
import { Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { authService } from "../services/auth.service";
import "./Header.css";

function Header() {
	let history = useHistory();

	const handleLogout = () => {
		authService
			.logout()
			.then((res) => {
				if (res.status === 200) {
					history.push("/login");
					window.location.reload();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Navbar className="header shadow-sm">
			<Navbar.Brand className="text text-dark">
				<a href="/" className="text text-decoration-none pointer">
					Trang chủ
				</a>
			</Navbar.Brand>
			<a
				href="/logout"
				className="pointer text text-decoration-none ml-auto"
				onClick={handleLogout}
			>
				Đăng xuất
			</a>
		</Navbar>
	);
}

export default Header;
