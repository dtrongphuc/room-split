import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../../Header/Header";
import Accordion from "../../Accordion/Accordion";
import SideBar from "../../SideBar/SideBar";

import { mainService } from "../../../services/main.service";
import "./HomePage.css";

function HomePage() {
	// state
	const [currentUser, setCurrentUser] = useState("");
	const [room, setRoom] = useState("");

	useEffect(() => {
		let didCancel = false;

		const getData = async () => {
			try {
				const response = await mainService.getAll();
				if (!didCancel) {
					setCurrentUser(response.user);
					setRoom(response.room);
				}
			} catch (err) {
				didCancel = true;
				console.log(err);
			}
		};

		getData();
		return () => {
			didCancel = true;
			console.log("canceling...");
		};
	}, []);

	return (
		<>
			<Header name={currentUser.realname} userID={currentUser._id} />
			<main className="home-main">
				<Container fluid>
					<Row noGutters="true">
						<Col sm={2} className="main-left">
							<SideBar room={room} />
						</Col>
						<Col sm={10} className="main-right">
							<Accordion user={currentUser} />
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}

export default HomePage;
