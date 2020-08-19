import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import RoomInfo from "./RoomInfo";
import Main from "./Main";

import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="Header">
				<Header />
			</header>
			<main className="Main">
				<Container fluid={"xl"}>
					<Row>
						<Col sm={4} className="main-left">
							<RoomInfo />
						</Col>
						<Col sm={8} className="main-right">
							<Main />
						</Col>
					</Row>
				</Container>
			</main>
		</div>
	);
}

export default App;
