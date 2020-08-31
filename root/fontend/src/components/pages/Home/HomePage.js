import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { HomeProvider } from "../../../context/HomeContext";
import Header from "../../Header/Header";
import Accordion from "../../Accordion/Accordion";
import SideBar from "../../SideBar/SideBar";
//import { mainService } from "../../../services/main.service";
import "./HomePage.css";

function HomePage() {
	// state
	return (
		<HomeProvider>
			<Header />
			<main className="home-main">
				<Container fluid>
					<Row noGutters="true">
						<Col md={3} className="main-left">
							<SideBar />
						</Col>
						<Col md={9} className="main-right">
							<Accordion />
						</Col>
					</Row>
				</Container>
			</main>
		</HomeProvider>
	);
}

export default HomePage;
