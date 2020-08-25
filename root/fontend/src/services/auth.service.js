import DataService from "../httpService";

export const authService = {
	login,
	logout,
	register,
	joinRoom,
	createRoom,
	isUserLogged,
};

function login(username, password) {
	DataService.postLogin({ username, password })
		.then((res) => {
			if (res) {
				return Promise.resolve({ success: true });
			}
		})
		.catch((err) => {
			if (err && err.response) {
				return Promise.reject(err.response.data);
			}
		});
}

function logout() {
	// call api logout -> server
}

function register(realname, username, password, passwordConfirm) {
	return new Promise((resolve, reject) => {
		DataService.postRegister({
			realname,
			username,
			password,
			passwordConfirm,
		})
			.then((res) => {
				if (res) {
					resolve({ success: true });
				}
			})
			.catch((err) => {
				if (err && err.response) {
					reject(err.response.data);
				}
			});
	});
}

function joinRoom(username, code) {
	return new Promise((resolve, reject) => {
		DataService.postJoinRoom({ username, code })
			.then((res) => {
				if (res) {
					resolve({ success: true });
				}
			})
			.catch((err) => {
				if (err && err.response) {
					reject(err.response.data);
				}
			});
	});
}

function createRoom(username, name, price, otherPrice) {
	return new Promise((resolve, reject) => {
		DataService.postCreateRoom({
			username,
			name,
			price,
			otherPrice,
		})
			.then((res) => {
				if (res) {
					resolve({ success: true });
				}
			})
			.catch((err) => {
				if (err && err.response) {
					reject(err.response.data);
				}
				reject(err);
			});
	});
}

function isUserLogged() {}
