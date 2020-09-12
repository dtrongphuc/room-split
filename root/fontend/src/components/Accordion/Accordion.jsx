import React, { useContext } from "react";
import { HomeContext } from "../../context/HomeContext";
import History from "../History/History";
import { Collapse } from "antd";
const { Panel } = Collapse;

export default function AccordionTable() {
	const { membersData, loading } = useContext(HomeContext);
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
							<History
								purchase={member.purchase}
								id={member._id}
								loading={loading}
								expense={member.priceOfMember - member.expense}
							/>
						</Panel>
					</Collapse>
				))}
		</>
	);
}
