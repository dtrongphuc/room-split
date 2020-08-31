const axios = require("axios");

const axiosRequest = axios.create({
	baseURL: "http://localhost:8080/api/",
	withCredantials: true,
	// headers: {
	// 	"content-type": "application/json",
	// 	"x-access-token": `${token}`,
	// 	...headers,
	// },
	headers: {
		"content-type": "application/json",
	},
	withCredentials: true,
	crossDomain: true,
	timeout: 10000,
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
	}
);

export default axiosRequest;
