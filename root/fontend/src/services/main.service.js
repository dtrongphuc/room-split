import DataService from "../httpService";

const getAll = () => {
	return new Promise((resolve, reject) => {
		DataService.getAll()
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

export const mainService = {
	getAll,
};
