import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { ExpandMore } from "@material-ui/icons";
import History from "./History";
import "./Main.css";

export default class Main extends React.Component {
	render() {
		return (
			<div className="members-list shadow-sm">
				<Accordion>
					<Card>
						<Card.Header className="d-flex justify-content-between">
							<h4>Member name</h4>
							<Accordion.Toggle
								as={ExpandMore}
								eventKey="0"
								style={{ cursor: "pointer" }}
							/>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<History />
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</div>
		);
	}
}
