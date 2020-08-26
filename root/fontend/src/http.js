const axios = require("axios");

export default axios.create({
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
