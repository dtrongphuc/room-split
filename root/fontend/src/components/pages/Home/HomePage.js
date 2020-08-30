import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { HomeProvider } from "../../../context/HomeContext";
import Header from "../../Header/Header";
import Accordion from "../../Accordion/Accordion";
import SideBar from "../../SideBar/SideBar";
//import { mainService } from "../../../services/main.service";
import "./HomePage.css";

function HomePage() {
	// state
	// const [currentUser, setCurrentUser] = useState("");
	// const [membersData, setMembersData] = useState([]);
	// const [room, setRoom] = useState("");
	// const [month] = useState(8);
	// const [year] = useState(2020);

	// const getData = useCallback(async () => {
	// 	try {
	// 		const response = await mainService.getAll({
	// 			month: month,
	// 			year: year,
	// 		});
	// 		if (response) {
	// 			setCurrentUser(response.currentUser);
	// 			setMembersData(response.membersData);
	// 			setRoom(response.room);
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }, [month, year]);

	// useEffect(() => {
	// 	console.log("start effect");
	// 	getData();
	// }, [getData]);

	//handleChangeMonth = () => {};
	return (
		<HomeProvider>
			<Header />
			<main className="home-main">
				<Container fluid>
					<Row noGutters="true">
						<Col md={3} className="main-left">
							<SideBar />
						</Col>
						<Col md={9} className="main-right">
							<Accordion />
						</Col>
					</Row>
				</Container>
			</main>
		</HomeProvider>
	);
}

export default HomePage;
