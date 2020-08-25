import DataService from "../httpService";
import handleResponse from "../helpers/handleResponse";

export const authService = {
	login,
	logout,
	isUserLogged,
};

function login(username, password) {
	DataService.postLogin({ username, password }).then((res) => {
		handleResponse(res);
	});
}

function logout() {
	// call api logout -> server
}

function isUserLogged() {}
