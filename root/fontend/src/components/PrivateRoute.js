import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { authService } from "../services/auth.service";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [isLogged, setIsLogged] = useState(true);

	useEffect(() => {
		let didCancel = false;

		async function isLogged() {
			try {
				const response = await authService.isAuth();
				if (!didCancel) {
					setIsLogged(response.status === 200 ? true : false);
				}
			} catch (err) {
				setIsLogged(false);
			}
		}

		isLogged();
		return () => {
			didCancel = true;
		};
	}, []);

	return (
		<Route
			{...rest}
			render={(props) =>
				isLogged ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
