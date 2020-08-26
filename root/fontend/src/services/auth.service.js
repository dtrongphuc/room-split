import DataService from "../httpService";

export const authService = {
	login,
	logout,
	register,
	joinRoom,
	createRoom,
	isAuth,
};

function login(username, password) {
	return new Promise((resolve, reject) => {
		DataService.postLogin({ username, password })
			.then((res) => {
				if (res) {
					return resolve({ success: true });
				}
			})
			.catch((err) => {
				if (err && err.response) {
					return reject(err.response.data);
				}
			});
	});
}

function logout() {
	return DataService.logout();
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

function createRoom(username, roomName, price, otherPrice) {
	return new Promise((resolve, reject) => {
		DataService.postCreateRoom({
			username,
			roomName,
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

function isAuth() {
	return DataService.isAuth();
}
