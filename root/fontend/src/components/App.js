import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import RegisterOption from "./pages/RegisterOption";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./PrivateRoute";

// import "antd/dist/antd.css";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
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
			</div>
		</Router>
	);
}

export default App;
