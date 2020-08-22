import http from "./http";

class RoomDataService {
	postLogin(data) {
		return http.post("/auth/login", data, { withCredantials: true });
	}
}
export default new RoomDataService();
