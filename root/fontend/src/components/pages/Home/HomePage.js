import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../../Header/Header";
import Accordion from "../../Accordion/Accordion";
import SideBar from "../../SideBar/SideBar";

import { mainService } from "../../../services/main.service";
import "./HomePage.css";

function HomePage() {
	// state
	const [currentUser, setCurrentUser] = useState("");
	const [membersData, setMembersData] = useState([]);
	const [room, setRoom] = useState("");
	const [month] = useState(8);
	const [year] = useState(2020);

	const getData = useCallback(async () => {
		try {
			const response = await mainService.getAll({
				month: month,
				year: year,
			});
			if (response) {
				setCurrentUser(response.currentUser);
				setMembersData(response.membersData);
				setRoom(response.room);
			}
		} catch (err) {
			console.log(err);
		}
	}, [month, year]);

	useEffect(() => {
		console.log("start effect");
		getData();
	}, [getData]);

	//handleChangeMonth = () => {};

	return (
		<>
			<Header
				name={currentUser.realname}
				userID={currentUser._id}
				onAddProduct={getData}
			/>
			<main className="home-main">
				<Container fluid>
					<Row noGutters="true">
						<Col md={3} className="main-left">
							<SideBar room={room} month={month} year={year} />
						</Col>
						<Col md={9} className="main-right">
							<Accordion members={membersData} />
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
}

export default HomePage;
