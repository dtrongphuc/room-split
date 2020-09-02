import React, { useState, useCallback, useEffect } from "react";
import moment from "moment";

import { mainService } from "../services/main.service";
export const HomeContext = React.createContext();

export const HomeProvider = (props) => {
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState("");
	const [membersData, setMembersData] = useState([]);
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
			}
		} catch (err) {}
		setLoading(false);
	}, [month, year]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<HomeContext.Provider
			value={{
				loading,
				currentUser,
				membersData,
				room,
				setMonth,
				setYear,
				getData,
				priceSplit: room.priceSplit,
			}}
		>
			{props.children}
		</HomeContext.Provider>
	);
};
