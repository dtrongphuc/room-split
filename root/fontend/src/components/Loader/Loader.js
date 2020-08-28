import React, { useEffect } from "react";
import { RotateSpinner } from "react-spinners-kit";

import "./Loader.css";
export default function ({ loading }) {
	useEffect(() => {
		let element = document.querySelector(".loader-wrapper");
		element.style.opacity = 1;
		element.style.transform = "translateY(40px)";

		return async () => {
			element.style.transform = "translateY(0px)";
		};
	}, []);
	return (
		<div className="loader-wrapper">
			<RotateSpinner size={30} color="#1877F2" loading={loading} />
		</div>
	);
}
