import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import Main from "../Main";
import "./HomePage.css";

const test = "344121";

export default class HomePage extends Component {
	render() {
		return (
			<div className="Home">
				<header className="Header">
					<Header />
				</header>
				<main className="Home-main">
					<Container fluid={"xl"}>
						<Row>
							<Col sm={4} className="main-left">
								<div className="info shadow-sm rounded">
									<h2>Phòng 6.2 Cute</h2>
									<ul className="info-list">
										<li>Giá phòng: {test}</li>
										<li>Số người: {test}</li>
									</ul>
								</div>
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
}
