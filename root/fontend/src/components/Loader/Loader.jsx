import React, { useEffect } from "react";
import { MetroSpinner } from "react-spinners-kit";

import "./Loader.css";
export default function ({ loading }) {
	useEffect(() => {
		let element = document.querySelector(".loader-wrapper");
		element.style.opacity = 1;
		element.style.transform = "translate(-50% ,40px)";

		return async () => {
			element.style.transform = "translate(-50% ,-50px)";
		};
	}, []);
	return (
		<div className="loader-wrapper">
			<MetroSpinner size={30} color="#1877F2" loading={loading} />
		</div>
	);
}
