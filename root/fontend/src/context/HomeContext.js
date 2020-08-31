import React, { useState, useCallback, useEffect } from "react";
import { mainService } from "../services/main.service";

export const HomeContext = React.createContext();

export const HomeProvider = (props) => {
	const [currentUser, setCurrentUser] = useState("");
	const [membersData, setMembersData] = useState([]);
	const [room, setRoom] = useState("");
	const [month, setMonth] = useState(8);
	const [year, setYear] = useState(2020);

	const getData = useCallback(async () => {
		try {
			const response = await mainService.getAll({
				month: month,
				year: year,
			});
			if (response) {
				setCurrentUser(response.currentUser);
				setMembersData(response.membersData);
				setRoom(response.room);
			}
		} catch (err) {
			console.log(err);
		}
	}, [month, year]);

	useEffect(() => {
		console.log("start effect");
		getData();
	}, [getData]);

	return (
		<HomeContext.Provider
			value={{
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
