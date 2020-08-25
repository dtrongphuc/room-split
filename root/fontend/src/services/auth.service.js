import DataService from "../httpService";

export const authService = {
	login,
	logout,
	register,
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

function isUserLogged() {}
