import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader/Loader";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuth, loading } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				!loading ? (
					isAuth ? (
						<Component {...props} />
					) : (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: props.location },
							}}
						/>
					)
				) : (
					<Loader loading={true} />
				)
			}
		/>
	);
};

export default PrivateRoute;
