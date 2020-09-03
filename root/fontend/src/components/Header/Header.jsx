import React, { useEffect, useState, useContext } from "react";
import { Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
	ExitToAppOutlined,
	AddRounded,
	ArrowDropDownRounded,
} from "@material-ui/icons";

import AddModal from "../AddModal/AddModal";
import { HomeContext } from "../../context/HomeContext";

import { authService } from "../../services/auth.service";
import "./Header.css";

const Header = () => {
	const { currentUser } = useContext(HomeContext);

	let history = useHistory();

	const [modalShow, setModalShow] = useState(false);

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

	useEffect(() => {
		let dropdowns = document.querySelectorAll(".dropdown-btn");
		dropdowns.forEach((btn) => {
			btn.addEventListener("click", handleDropdown, true);
		});
		return () => {
			let dropdowns = document.querySelectorAll(".dropdown-btn");
			dropdowns.forEach((btn) => {
				btn.removeEventListener("click", handleDropdown, true);
			});
		};
	}, []);

	const handleDropdown = (e) => {
		let current = e.currentTarget;
		let parentNode = current.parentNode;
		if (!current && !parentNode) {
			return;
		}
		let dropdown = parentNode.querySelector(".dropdown");
		current.classList.toggle("focus");
		dropdown && dropdown.classList.toggle("d-block");
	};

	return (
		<header className="header">
			<Navbar className="nav">
				<Navbar.Brand className="text text-dark">
					<a href="/" className="text text-decoration-none pointer">
						Trang chủ
					</a>
				</Navbar.Brand>
				<div className="ml-auto d-flex align-items-center">
					<ul className="d-flex align-items-center">
						<li className="mx-1">
							<button
								className="btn btn-rounded"
								title="Thêm sản phẩm"
								onClick={() => setModalShow(true)}
							>
								<AddRounded className="header-icon" />
							</button>
						</li>
						<li className="position-relative">
							<button className="btn btn-rounded dropdown-btn">
								<ArrowDropDownRounded
									className="header-icon"
									style={{ fontSize: "32px" }}
								/>
							</button>
							<div className="dropdown user-dropdown">
								<ul>
									<li className="dropdown-item">
										<div className="radius-50 width-48 mr-3">
											<div className="avatar"></div>
										</div>
										<p className="text-capitalize dropdown-item-text">
											{currentUser.realname}
										</p>
									</li>
									<span className="dropdown-line"></span>
									<li
										className="dropdown-item"
										onClick={handleLogout}
									>
										<ExitToAppOutlined className="mr-3 header-icon" />
										<p className="dropdown-item-text">
											Đăng xuất
										</p>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</Navbar>
			<AddModal show={modalShow} onHide={() => setModalShow(false)} />
		</header>
	);
};

export default Header;
