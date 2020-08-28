import React from "react";
import {
	HomeRounded,
	VpnKeyRounded,
	GroupRounded,
	AttachMoneyRounded,
} from "@material-ui/icons";

import "./SideBar.css";

export default function SideBar({ room }) {
	return (
		<div className="sidebar">
			<ul className="sidebar-list">
				<li className="d-flex align-items-center my-2">
					<HomeRounded className="sidebar-icon" />
					<p className="special-title text-capitalize">{room.name}</p>
				</li>
				<li className="d-flex align-items-center my-2">
					<VpnKeyRounded className="sidebar-icon" />
					<p className="sidebar-text">Mã phòng: {room.code}</p>
				</li>
				<li className="d-flex align-items-center my-2">
					<GroupRounded className="sidebar-icon" />
					<p className="sidebar-text">Số người: {room.memberCount}</p>
				</li>
				<li className="d-flex align-items-center my-2">
					<AttachMoneyRounded className="sidebar-icon" />
					<p className="sidebar-text">Giá phòng: {room.price}</p>
				</li>
				<li className="d-flex align-items-center my-2">
					<AttachMoneyRounded className="sidebar-icon" />
					<p className="sidebar-text">Tiền khác: {room.otherPrice}</p>
				</li>
			</ul>
		</div>
	);
}
