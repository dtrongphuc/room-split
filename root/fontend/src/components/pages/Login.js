import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import { authService } from "../../services/auth.service";
import "./Auth.css";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			submit: false,
		};

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onInputFocus = this.onInputFocus.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
		this.setState({
			username: "",
			password: "",
			submit: false,
		});
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value,
		});
	}

	onInputFocus(filterKey) {
		let formGroup = document.querySelector(
			`.form-group-cs[form-filter=${filterKey}]`
		);
		formGroup.classList.add("focus-active");
	}

	onFocusOut(filterKey) {
		let formGroup = document.querySelector(
			`.form-group-cs[form-filter=${filterKey}]`
		);
		formGroup.classList.remove("focus-active");
	}

	handleLogin() {
		authService.login(this.state.username, this.state.password);
		this.props.history.push("/");
	}

	render() {
		const { username, password, submit } = this.state;
		return submit ? (
			<h2>Login...</h2>
		) : (
			<div className="auth d-flex align-items-center justify-content-center">
				<div className="bg"></div>
				<div className="wrapper">
					<h2 className="auth-title text-center">Đăng nhập</h2>
					<Form className="auth-form d-flex align-items-center justify-content-center flex-column">
						<Form.Group
							as={Row}
							noGutters={true}
							controlId="formUsername"
							className="form-group-cs"
							form-filter="username"
						>
							<span className="line" />
							<Form.Label className="text-right form-label">
								<UserOutlined className="auth-icon" />
							</Form.Label>
							<Col sm="10">
								<Form.Control
									type="text"
									placeholder="Tài khoản"
									required
									value={username}
									onChange={this.onChangeUsername}
									className="auth-input px-3"
									onFocus={() =>
										this.onInputFocus("username")
									}
									onBlur={() => this.onFocusOut("username")}
								/>
							</Col>
						</Form.Group>

						<Form.Group
							as={Row}
							noGutters={true}
							controlId="formPassword"
							className="form-group-cs"
							form-filter="password"
						>
							<span className="line" />
							<Form.Label className="text-right form-label">
								<LockOutlined className="auth-icon" />
							</Form.Label>
							<Col sm="10">
								<Form.Control
									type="password"
									value={password}
									required
									onChange={this.onChangePassword}
									placeholder="Mật khẩu"
									className="auth-input px-3"
									onFocus={() =>
										this.onInputFocus("password")
									}
									onBlur={() => this.onFocusOut("password")}
								/>
							</Col>
						</Form.Group>
						<Button
							className="text-center btn"
							onClick={this.handleLogin}
						>
							Đăng nhập
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
export default withRouter(Login);
