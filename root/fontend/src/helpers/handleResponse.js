export default function handleResponse(response) {
	if (response.statusText !== "OK") {
		if ([401, 403].indexOf(response.status) !== -1) {
			window.location.reload();
		}

		const error = (response && response.message) || response.statusText;
		return Promise.reject(error);
	}

	return response.data;
}
