import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { DownOutlined } from "@ant-design/icons";

import History from "../History/History";
import "./Accordion.css";
export default function AccordionTable({ user }) {
	return (
		<Accordion className="my-4 rounded-lg shadow-sm">
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="user-select-none">{user.realname}</h4>
					<Accordion.Toggle
						as={DownOutlined}
						eventKey="0"
						className="pointer no-outline user-select-none"
					/>
				</Card.Header>
				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<History />
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}
