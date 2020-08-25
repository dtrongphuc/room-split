import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, logged, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				logged() ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}
