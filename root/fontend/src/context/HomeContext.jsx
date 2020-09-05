import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";

import { mainService } from "../services/main.service";
export const HomeContext = React.createContext();

export const HomeProvider = (props) => {
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState("");
	const [membersData, setMembersData] = useState([]);
	const [membersName, setMembersName] = useState([]);
	const [room, setRoom] = useState("");
	const [month, setMonth] = useState(moment().format("M"));
	const [year, setYear] = useState(moment().format("YYYY"));

	const getData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await mainService.getAll({
				month: month,
				year: year,
			});
			if (response) {
				setCurrentUser(response.currentUser);
				setMembersData(response.membersData);
				setRoom(response.room);
				setMembersName(getMembersName(response.membersData));
			}
		} catch (err) {
		} finally {
			setLoading(false);
		}
	}, [month, year]);

	const getMembersName = (data) => {
		return data.map((member) => {
			return {
				_id: member._id,
				name: member.realname,
			};
		});
	};

	const handleDeletePurchase = (id) => {
		mainService.postDeletePurchase({ _id: id }).then(() => getData());
	};

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<HomeContext.Provider
			value={{
				loading,
				currentUser,
				membersData,
				membersName,
				room,
				setMonth,
				setYear,
				getData,
				handleDeletePurchase,
			}}
		>
			{props.children}
		</HomeContext.Provider>
	);
};
