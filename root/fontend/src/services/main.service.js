import DataService from "../httpService";

const getAll = (data) => {
	return new Promise((resolve, reject) => {
		DataService.getAll(data)
			.then((res) => {
				if (res) {
					resolve(res.data);
				}
			})
			.catch((err) => {
				reject(err);
			})
			.catch((err) => {});
	});
};

const postPurchase = (params) => {
	return new Promise((resolve, reject) => {
		DataService.postPurchase(params)
			.then((res) => {
				if (res) {
					resolve(res.status);
				}
			})
			.catch((err) => {
				reject(err);
			})
			.catch((err) => {});
	});
};

export const mainService = {
	getAll,
	postPurchase,
};
