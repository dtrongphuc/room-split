import React, { useState, useCallback } from "react";
import { Card, Button, Form, Alert, Row, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import {
	TagOutlined,
	DollarOutlined,
	CloseOutlined,
	KeyOutlined,
} from "@ant-design/icons";

import { authService } from "../../../services/auth.service";
import "./Auth.css";

const RegisterOption = () => {
	let history = useHistory();
	let location = useLocation();

	const currentUser = (location.state && location.state.user) || null;
	if (!currentUser) {
		history.push("/login");
	}

	const [selected, setSelected] = useState(null);
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState("");

	const [roomName, setRoomName] = useState("");
	const [price, setRoomPrice] = useState("");
	const [otherPrice, setRoomOtherPrice] = useState("");
	const [code, setRoomCode] = useState("");

	const onChangeRoomName = useCallback((e) => {
		setRoomName(e.target.value);
	}, []);

	const onChangeRoomPrice = useCallback((e) => {
		setRoomPrice(e.target.value);
	}, []);

	const onChangeRoomOtherPrice = useCallback((e) => {
		setRoomOtherPrice(e.target.value);
	}, []);

	const onChangeRoomCode = useCallback((e) => {
		setRoomCode(e.target.value);
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

	const handleCreateRoom = useCallback(
		(e) => {
			e.preventDefault();
			authService
				.createRoom(currentUser, roomName, price, otherPrice)
				.then((res) => {
					setSuccessful(true);
					history.push("/");
				})
				.catch((err) => {
					setSuccessful(false);
					setMessage(
						(err && err.error["message"]) || "Có lỗi đã xảy ra"
					);
				});
		},
		[currentUser, roomName, price, otherPrice, history]
	);

	const handleJoinRoom = useCallback(
		(e) => {
			e.preventDefault();
			authService
				.joinRoom(currentUser, code)
				.then((res) => {
					setSuccessful(true);
					setMessage("");
					history.push("/");
				})
				.catch((err) => {
					setMessage(
						(err && err.error["message"]) || "Có lỗi đã xảy ra"
					);
				});
		},
		[currentUser, code, history]
	);

	const switchToCreateRoom = useCallback(() => {
		setSelected("create");
	}, []);

	const switchToJoinRoom = useCallback(() => {
		setSelected("join");
	}, []);

	const switchToOptions = useCallback(() => {
		setSelected(null);
		setMessage(null);
	}, []);

	return successful ? (
		""
	) : (
		<div>
			<div className="bg"></div>
			<div className="wrapper d-flex justify-content-center align-items-center">
				{selected ? (
					""
				) : (
					<Card className="rounded-lg">
						<Card.Header>
							<h3>Xin chào {currentUser}</h3>
						</Card.Header>
						<Card.Body className="p-md-5 p-sm-3">
							<Button
								className="btn m-3 btn-auth"
								variant="primary"
								onClick={switchToCreateRoom}
							>
								Tạo phòng mới
							</Button>

							<Button
								className="btn m-3 btn-auth"
								variant="primary"
								onClick={switchToJoinRoom}
							>
								Tham gia phòng
							</Button>
						</Card.Body>
					</Card>
				)}
				{selected && selected === "create" && (
					<div className="d-flex justify-content-center align-items-center flex-column">
						<h2 className="auth-title text-center">
							Thông tin phòng
						</h2>
						<Form
							id="form-create"
							onSubmit={handleCreateRoom}
							className="auth-form d-flex align-items-center justify-content-center flex-column"
						>
							<CloseOutlined
								as={Button}
								onClick={switchToOptions}
								className="align-self-end mr-3 close-icon"
							/>
							{message ? (
								<Alert variant="dark">{message}</Alert>
							) : (
								""
							)}
							<Form.Group
								as={Row}
								noGutters={true}
								controlId="formRoomName"
								className="form-group-cs"
								form-filter="roomName"
							>
								<span className="line" />
								<Form.Label className="text-right form-label form-label__auth">
									<TagOutlined className="auth-icon" />
								</Form.Label>
								<Col sm="10">
									<Form.Control
										type="text"
										placeholder="Tên phòng"
										required
										value={roomName}
										onChange={onChangeRoomName}
										className="auth-input no-outline px-3"
										onFocus={() => onInputFocus("roomName")}
										onBlur={() => onFocusOut("roomName")}
									/>
								</Col>
							</Form.Group>
							<Form.Group
								as={Row}
								noGutters={true}
								controlId="formPrice"
								className="form-group-cs"
								form-filter="roomPrice"
							>
								<span className="line" />
								<Form.Label className="text-right form-label form-label__auth">
									<DollarOutlined className="auth-icon" />
								</Form.Label>
								<Col sm="10">
									<Form.Control
										type="number"
										min="0"
										placeholder="Giá phòng"
										required
										value={price}
										onChange={onChangeRoomPrice}
										className="auth-input no-outline px-3"
										onFocus={() =>
											onInputFocus("roomPrice")
										}
										onBlur={() => onFocusOut("roomPrice")}
									/>
								</Col>
							</Form.Group>
							<Form.Group
								as={Row}
								noGutters={true}
								controlId="formOtherPrice"
								className="form-group-cs"
								form-filter="otherPrice"
							>
								<span className="line" />
								<Form.Label className="text-right form-label form-label__auth">
									<DollarOutlined className="auth-icon" />
								</Form.Label>
								<Col sm="10">
									<Form.Control
										type="number"
										min="0"
										placeholder="Khoảng tiền khác"
										required
										value={otherPrice}
										onChange={onChangeRoomOtherPrice}
										className="auth-input no-outline px-3"
										onFocus={() =>
											onInputFocus("otherPrice")
										}
										onBlur={() => onFocusOut("otherPrice")}
									/>
								</Col>
							</Form.Group>
							<Button
								type="submit"
								form="form-create"
								className="text-center btn btn-auth mt-4 mb-2"
							>
								Tạo phòng
							</Button>
						</Form>
					</div>
				)}
				{selected && selected === "join" && (
					<div className="d-flex justify-content-center align-items-center flex-column">
						<h2 className="auth-title text-center">
							Tham gia phòng
						</h2>
						<Form
							id="form-join"
							onSubmit={handleJoinRoom}
							className="auth-form d-flex align-items-center justify-content-center flex-column"
						>
							<CloseOutlined
								as={Button}
								onClick={switchToOptions}
								className="align-self-end mr-3 close-icon"
							/>
							{message ? (
								<Alert variant="dark">{message}</Alert>
							) : (
								""
							)}
							<Form.Group
								as={Row}
								noGutters={true}
								controlId="formRoomCode"
								className="form-group-cs"
								form-filter="roomCode"
							>
								<span className="line" />
								<Form.Label className="text-right form-label form-label__auth">
									<KeyOutlined className="auth-icon" />
								</Form.Label>
								<Col sm="10">
									<Form.Control
										type="text"
										placeholder="Mã phòng"
										required
										value={code}
										onChange={onChangeRoomCode}
										className="auth-input no-outline px-3"
										onFocus={() => onInputFocus("roomCode")}
										onBlur={() => onFocusOut("roomCode")}
									/>
								</Col>
							</Form.Group>
							<Button
								form="form-join"
								type="submit"
								className="text-center btn btn-auth mt-4 mb-2"
							>
								Tham gia
							</Button>
						</Form>
					</div>
				)}
			</div>
		</div>
	);
};

export default RegisterOption;
