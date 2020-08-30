import React, { useContext } from "react";
import { HomeContext } from "../../context/HomeContext";
import History from "../History/History";
import "./Accordion.css";
import { Collapse } from "antd";
const { Panel } = Collapse;

export default function AccordionTable() {
	const { membersData } = useContext(HomeContext);
	return (
		<>
			{membersData &&
				membersData.map((member, index) => (
					<Collapse
						key={index}
						expandIconPosition="right"
						accordion="true"
						defaultActiveKey={["0"]}
						className="my-4"
					>
						<Panel header={member.realname} key={index}>
							<History purchase={member.purchase} />
						</Panel>
					</Collapse>
				))}
		</>
	);
}
