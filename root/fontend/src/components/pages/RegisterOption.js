import React, { useState, useCallback } from "react";
import { Card, Button, Form, Alert, Row, Col } from "react-bootstrap";
//import { useHistory } from "react-router-dom";
import {
	TagOutlined,
	DollarOutlined,
	CloseOutlined,
	KeyOutlined,
} from "@ant-design/icons";

import { authService } from "../../services/auth.service";
import "./Auth.css";

const RegisterOption = () => {
	//let history = useHistory();

	const [selected, setSelected] = useState(null);
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState("");

	const [name, setRoomName] = useState("");
	const [price, setRoomPrice] = useState();
	const [otherPrice, setRoomOtherPrice] = useState();
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

	const handleCreateRoom = useCallback(() => {
		console.log("creating room...");
		console.log(name, price, otherPrice);
		authService
			.createRoom("dtrongphucaaa", name, price, otherPrice)
			.then((res) => {
				console.log(res);
				setSuccessful(true);
			})
			.catch((err) => {
				console.log(err);
				setMessage((err && err.error["message"]) || "Có lỗi đã xảy ra");
			});
		// history.push("/login");
	}, [name, price, otherPrice]);

	const handleJoinRoom = useCallback(() => {
		console.log("joining room...");
		authService
			.joinRoom("newuser", code)
			.then((res) => {
				console.log(res);
				setSuccessful(true);
				setMessage("");
			})
			.catch((err) => {
				console.log(err);
				setMessage((err && err.error["message"]) || "Có lỗi đã xảy ra");
			});
	}, [code]);

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
							<h3>Xin chào...</h3>
						</Card.Header>
						<Card.Body className="p-md-5 p-sm-3">
							<Button
								className="btn m-3"
								variant="primary"
								onClick={switchToCreateRoom}
							>
								Tạo phòng mới
							</Button>

							<Button
								className="btn m-3"
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
						<Form className="auth-form d-flex align-items-center justify-content-center flex-column">
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
								form-filter="name"
							>
								<span className="line" />
								<Form.Label className="text-right form-label">
									<TagOutlined className="auth-icon" />
								</Form.Label>
								<Col sm="10">
									<Form.Control
										type="text"
										placeholder="Tên phòng"
										required
										value={name}
										onChange={onChangeRoomName}
										className="auth-input px-3"
										onFocus={() => onInputFocus("name")}
										onBlur={() => onFocusOut("name")}
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
								<Form.Label className="text-right form-label">
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
										className="auth-input px-3"
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
								<Form.Label className="text-right form-label">
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
										className="auth-input px-3"
										onFocus={() =>
											onInputFocus("otherPrice")
										}
										onBlur={() => onFocusOut("otherPrice")}
									/>
								</Col>
							</Form.Group>
							<Button
								className="text-center btn"
								onClick={handleCreateRoom}
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
						<Form className="auth-form d-flex align-items-center justify-content-center flex-column">
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
								<Form.Label className="text-right form-label">
									<KeyOutlined className="auth-icon" />
								</Form.Label>
								<Col sm="10">
									<Form.Control
										type="text"
										placeholder="Mã phòng"
										required
										value={code}
										onChange={onChangeRoomCode}
										className="auth-input px-3"
										onFocus={() => onInputFocus("roomCode")}
										onBlur={() => onFocusOut("roomCode")}
									/>
								</Col>
							</Form.Group>
							<Button
								className="text-center btn"
								onClick={handleJoinRoom}
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
