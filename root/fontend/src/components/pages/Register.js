import React, { useState, useCallback } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { UserOutlined, LockOutlined, SmileOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import { authService } from "../../services/auth.service";
import "./Auth.css";

function Register() {
	const [realname, setRealname] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState("");

	const onChangeRealName = useCallback((e) => {
		setRealname(e.target.value);
	}, []);

	const onChangeUsername = useCallback((e) => {
		setUsername(e.target.value);
	}, []);

	const onChangePassword = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	const onChangePasswordConfirm = useCallback((e) => {
		setPasswordConfirm(e.target.value);
	}, []);

	const onInputFocus = useCallback((filterKey) => {
		let formGroup = document.querySelector(
			`.form-group-cs[form-filter=${filterKey}]`
		);
		formGroup.classList.add("focus-active");
	}, []);

	const onFocusOut = useCallback((filterKey) => {
		let formGroup = document.querySelector(
			`.form-group-cs[form-filter=${filterKey}]`
		);
		formGroup.classList.remove("focus-active");
	}, []);

	const handleRegister = useCallback(() => {
		authService
			.register(realname, username, password, passwordConfirm)
			.then((res) => {
				console.log(res);
				setSuccessful(true);
				setMessage("");
			})
			.catch((err) => {
				console.log(err);
				setMessage(err.error["message"]);
			});
		//this.props.history.push("/");
	}, [realname, username, password, passwordConfirm]);

	return successful ? (
		<h2>register...</h2>
	) : (
		<div className="auth d-flex align-items-center justify-content-center">
			<div className="bg"></div>
			<div className="wrapper d-flex align-items-center justify-content-center flex-column">
				<h2 className="auth-title text-center">Đăng ký</h2>
				<Form className="auth-form d-flex align-items-center justify-content-center flex-column">
					{message ? <Alert variant="dark">{message}</Alert> : ""}
					<Form.Group
						as={Row}
						noGutters={true}
						controlId="formRealName"
						className="form-group-cs"
						form-filter="realname"
					>
						<span className="line" />
						<Form.Label className="text-right form-label">
							<SmileOutlined className="auth-icon" />
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="text"
								placeholder="Họ tên"
								required
								value={realname}
								onChange={onChangeRealName}
								className="auth-input px-3"
								onFocus={() => onInputFocus("realname")}
								onBlur={() => onFocusOut("realname")}
							/>
						</Col>
					</Form.Group>
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
								onChange={onChangeUsername}
								className="auth-input px-3"
								onFocus={() => onInputFocus("username")}
								onBlur={() => onFocusOut("username")}
							/>
						</Col>
					</Form.Group>
					<Form.Group
						as={Row}
						noGutters={true}
						controlId="formPassword"
						className="form-group-cs"
						form-filter="passwordConfirm"
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
								onChange={onChangePassword}
								placeholder="Mật khẩu"
								className="auth-input px-3"
								onFocus={() => onInputFocus("passwordConfirm")}
								onBlur={() => onFocusOut("passwordConfirm")}
							/>
						</Col>
					</Form.Group>
					<Form.Group
						as={Row}
						noGutters={true}
						controlId="formPasswordConfirm"
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
								value={passwordConfirm}
								required
								onChange={onChangePasswordConfirm}
								placeholder="Nhập lại mật khẩu"
								className="auth-input px-3"
								onFocus={() => onInputFocus("password")}
								onBlur={() => onFocusOut("password")}
							/>
						</Col>
					</Form.Group>
					<Button
						className="text-center btn"
						onClick={handleRegister}
					>
						Đăng ký
					</Button>
				</Form>
			</div>
		</div>
	);
}
export default withRouter(Register);
