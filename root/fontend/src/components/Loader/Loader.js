import React from "react";
import { RotateSpinner } from "react-spinners-kit";

import "./Loader.css";
export default function ({ loading }) {
	return (
		<div className="loader-wrapper">
			<RotateSpinner size={30} color="#1877F2" loading={loading} />
		</div>
	);
}
