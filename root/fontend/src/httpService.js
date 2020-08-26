import axios from "./http";

class RoomDataService {
	postLogin(data) {
		return axios.post("/auth/login", data);
	}

	postRegister(data) {
		return axios.post("/auth/register", data);
	}

	postJoinRoom(data) {
		return axios.post("/auth/join", data);
	}

	postCreateRoom(data) {
		return axios.post("/auth/create", data);
	}

	isAuth() {
		return axios.get("/auth/isAuth");
	}

	logout() {
		return axios.get("/auth/logout");
	}

	getAll() {
		return axios.get("/get-all");
	}
}
export default new RoomDataService();
