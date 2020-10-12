import React, { lazy } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { HomeProvider } from "../../../context/HomeContext";

const Header = lazy(() => import("../../Header/Header"));
const Accordion = lazy(() => import("../../Accordion/Accordion"));
const SideBar = lazy(() => import("../../SideBar/SideBar"));

function HomePage() {
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
