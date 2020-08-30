import React, { useContext } from "react";
import { DatePicker, Space } from "antd";
import {
	HomeRounded,
	VpnKeyRounded,
	GroupRounded,
	AttachMoneyRounded,
} from "@material-ui/icons";
import moment from "moment";
import locale from "antd/es/date-picker/locale/vi_VN";

import { HomeContext } from "../../context/HomeContext";
import "./SideBar.css";

export default function SideBar() {
	const { room, setMonth, setYear } = useContext(HomeContext);

	const onChangeDate = (date, dateString) => {
		if (dateString) {
			let selected = dateString.split("-");
			setMonth(selected[0]);
			setYear(selected[1]);
		}
	};

	return (
		<div className="sidebar">
			<ul className="sidebar-list">
				<li className="d-flex align-items-center my-3">
					<HomeRounded className="sidebar-icon" />
					<p className="special-title text-capitalize">{room.name}</p>
				</li>
				<li className="d-flex align-items-center my-3">
					<VpnKeyRounded className="sidebar-icon" />
					<p className="sidebar-text">Mã phòng: {room.code}</p>
				</li>
				<li className="d-flex align-items-center my-3">
					<GroupRounded className="sidebar-icon" />
					<p className="sidebar-text">Số người: {room.memberCount}</p>
				</li>
				<li className="d-flex align-items-center my-3">
					<AttachMoneyRounded className="sidebar-icon" />
					<p className="sidebar-text">Giá phòng: {room.price}</p>
				</li>
				<li className="d-flex align-items-center my-3">
					<AttachMoneyRounded className="sidebar-icon" />
					<p className="sidebar-text">Tiền khác: {room.otherPrice}</p>
				</li>
				<li className="d-flex align-items-center my-3">
					<label form="month" className="mb-0 mr-2">
						Thời gian:
					</label>
					<Space direction="vertical" size={12}>
						<DatePicker
							locale={locale}
							picker="month"
							defaultValue={moment("08-2020", "MM-YYYY")}
							onChange={onChangeDate}
							format="MM-YYYY"
						/>
					</Space>
				</li>
			</ul>
		</div>
	);
}
