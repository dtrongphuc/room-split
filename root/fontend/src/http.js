require("dotenv").config();
const axios = require("axios");

axios.defaults.withCredentials = true;

const axiosRequest = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		"content-type": "application/json",
	},
	crossDomain: true,
	timeout: 60000,
});

axiosRequest.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response && error.response.status === 307) {
			try {
				await axiosRequest.get("/auth/refresh-token");
				return axiosRequest(error.config);
			} catch (err) {
				return Promise.reject(err);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosRequest;
