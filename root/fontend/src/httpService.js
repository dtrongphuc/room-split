import http from "./http";

class RoomDataService {
	postLogin(data) {
		return http.post("/auth/login", data);
	}

	postRegister(data) {
		return http.post("/auth/register", data);
	}
}
export default new RoomDataService();
