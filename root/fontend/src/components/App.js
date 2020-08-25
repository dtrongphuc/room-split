import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./PrivateRoute";

import { authService } from "../services/auth.service";
// import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogged: false,
		};
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route path="/login">
							<LoginPage />
						</Route>
						<PrivateRoute
							exact
							path="/"
							logged={authService.isUserLogged}
						>
							<HomePage />
						</PrivateRoute>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
