import http from "./http";

class RoomDataService {
	postLogin(data) {
		return http.post("/auth/login", data);
	}

	postRegister(data) {
		return http.post("/auth/register", data);
	}

	postJoinRoom(data) {
		return http.post("/auth/join", data);
	}

	postCreateRoom(data) {
		return http.post("/auth/create", data);
	}

	getAll() {
		return http.get("/get-all");
	}
}
export default new RoomDataService();
