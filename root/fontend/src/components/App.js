import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Loader from "./Loader/Loader";

const LoginPage = lazy(() => import("./pages/Authentication/Login"));
const RegisterPage = lazy(() => import("./pages/Authentication/Register"));
const RegisterOption = lazy(() =>
	import("./pages/Authentication/RegisterOption")
);
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));

function App() {
	return (
		<Router>
			<Suspense fallback={<Loader loading={true} />}>
				<Switch>
					<Route exact path="/login">
						<LoginPage />
					</Route>
					<Route exact path="/register">
						<RegisterPage />
					</Route>
					<Route exact path="/register/options">
						<RegisterOption />
					</Route>
					<PrivateRoute exact path="/" component={HomePage} />
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
