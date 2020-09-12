import React, { useState, useCallback } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { UserOutlined, LockOutlined, SmileOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { authService } from "../../../services/auth.service";

function Register() {
	let history = useHistory();

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

	const onInputFocus = (filterKey) => {
		let formGroup = document.querySelector(
			`.form-group-cs[form-filter=${filterKey}]`
		);
		formGroup.classList.add("focus-active");
	};

	const onFocusOut = (filterKey) => {
		let formGroup = document.querySelector(
			`.form-group-cs[form-filter=${filterKey}]`
		);
		formGroup.classList.remove("focus-active");
	};

	const handleRegister = useCallback(
		(e) => {
			e.preventDefault();
			authService
				.register(realname, username, password, passwordConfirm)
				.then((res) => {
					console.log(res);
					setSuccessful(true);
					setMessage("");
					history.push("/register/options", { user: username });
				})
				.catch((err) => {
					console.log(err);
					setSuccessful(false);
					setMessage(
						(err && err.error["message"]) || "Có lỗi đã xảy ra"
					);
				});
		},
		[realname, username, password, passwordConfirm, history]
	);

	return successful ? (
		<h2>register...</h2>
	) : (
		<div className="auth d-flex align-items-center justify-content-center">
			<div className="bg"></div>
			<div className="wrapper d-flex align-items-center justify-content-center flex-column">
				<h2 className="auth-title text-center">Đăng ký</h2>
				<Form
					id="form-register"
					onSubmit={handleRegister}
					className="auth-form d-flex align-items-center justify-content-center flex-column"
				>
					{message ? <Alert variant="dark">{message}</Alert> : ""}
					<Form.Group
						as={Row}
						noGutters={true}
						controlId="formRealName"
						className="form-group-cs"
						form-filter="realname"
					>
						<span className="line" />
						<Form.Label className="text-right form-label form-label__auth">
							<SmileOutlined className="auth-icon" />
						</Form.Label>
						<Col xs="10">
							<Form.Control
								type="text"
								placeholder="Họ tên"
								required
								value={realname}
								onChange={onChangeRealName}
								className="auth-input no-outline px-3"
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
						<Form.Label className="text-right form-label form-label__auth">
							<UserOutlined className="auth-icon" />
						</Form.Label>
						<Col xs="10">
							<Form.Control
								type="text"
								placeholder="Tài khoản"
								required
								autoComplete="username"
								value={username}
								onChange={onChangeUsername}
								className="auth-input no-outline px-3"
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
						<Form.Label className="text-right form-label form-label__auth">
							<LockOutlined className="auth-icon" />
						</Form.Label>
						<Col xs="10">
							<Form.Control
								type="password"
								value={password}
								required
								onChange={onChangePassword}
								placeholder="Mật khẩu"
								autoComplete="new-password"
								className="auth-input no-outline px-3"
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
						<Form.Label className="text-right form-label form-label__auth">
							<LockOutlined className="auth-icon" />
						</Form.Label>
						<Col xs="10">
							<Form.Control
								type="password"
								value={passwordConfirm}
								required
								onChange={onChangePasswordConfirm}
								placeholder="Nhập lại mật khẩu"
								autoComplete="new-password"
								className="auth-input no-outline px-3"
								onFocus={() => onInputFocus("password")}
								onBlur={() => onFocusOut("password")}
							/>
						</Col>
					</Form.Group>
					<div className="d-flex align-items-center justify-content-around mt-4 full-width row no-gutters">
						<Col md={6} xs={12} className="text-center">
							<a
								href="/login"
								className="text text-decoration-none my-3"
							>
								Đăng nhập
							</a>
						</Col>

						<Col md={6} xs={12} className="text-center">
							<Button
								type="submit"
								className="text-center btn btn-auth my-3"
								form="form-register"
								value="submit"
							>
								Đăng ký
							</Button>
						</Col>
					</div>
				</Form>
			</div>
		</div>
	);
}
export default Register;
