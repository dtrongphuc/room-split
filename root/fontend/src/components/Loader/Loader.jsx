import React, { useEffect } from "react";
import { CircleSpinner, GridSpinner } from "react-spinners-kit";

export default function ({ loading, fullscreen }) {
	useEffect(() => {
		if (fullscreen) return;
		let element = document.querySelector(".loader-wrapper");
		element.style.opacity = 1;
		element.style.transform = "translate(-50% ,40px)";

		return async () => {
			element.style.transform = "translate(-50% ,-50px)";
		};
	}, [fullscreen]);
	return !fullscreen ? (
		<div className="loader-wrapper">
			<CircleSpinner size={30} color="#69c0ff" loading={loading} />
		</div>
	) : (
		<div className="loader-fullscreen">
			<GridSpinner color="#69c0ff" size={62} />
		</div>
	);
}
