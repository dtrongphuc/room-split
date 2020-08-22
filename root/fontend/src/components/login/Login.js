import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import DataService from "../../httpService";

import "./Login.css";

export default class Login extends Component {
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
		this.onSubmit = this.onSubmit.bind(this);
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

	onSubmit() {
		var data = {
			username: this.state.username,
			password: this.state.password,
		};

		DataService.postLogin(data)
			.then((response) => {
				if (response) {
					this.setState({
						submit: true,
					});
					console.log(response);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { username, password, submit } = this.state;
		return submit ? (
			<h2>Login...</h2>
		) : (
			<div className="login d-flex align-items-center justify-content-center">
				<div className="wrapper">
					<h2 className="login-title text-center">Đăng nhập</h2>
					<Form className="login-form d-flex align-content-center justify-content-center flex-column">
						<Form.Group
							as={Row}
							noGutters={true}
							controlId="formUsername"
							className="form-group-cs"
							form-filter="username"
						>
							<span className="line" />
							<Form.Label className="text-right form-label">
								<UserOutlined className="login-icon" />
							</Form.Label>
							<Col sm="10">
								<Form.Control
									type="text"
									placeholder="Tài khoản"
									required
									value={username}
									onChange={this.onChangeUsername}
									className="login-input px-3"
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
								<LockOutlined className="login-icon" />
							</Form.Label>
							<Col sm="10">
								<Form.Control
									type="password"
									value={password}
									required
									onChange={this.onChangePassword}
									placeholder="Mật khẩu"
									className="login-input px-3"
									onFocus={() =>
										this.onInputFocus("password")
									}
									onBlur={() => this.onFocusOut("password")}
								/>
							</Col>
						</Form.Group>
						<Button
							className="text-center btn"
							onClick={this.onSubmit}
						>
							Đăng nhập
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
