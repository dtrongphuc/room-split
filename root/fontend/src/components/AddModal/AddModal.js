import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Button, Alert } from "react-bootstrap";
import moment from "moment";

import { mainService } from "../../services/main.service";
import Loader from "../Loader/Loader";

function AddModal({ userID, ...props }) {
	const [current, setCurrent] = useState("");
	const [end, setEnd] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		let currentDate = moment().format("YYYY-MM-DD");
		let endDate = moment().endOf("month").format("YYYY-MM-DD");
		setCurrent(currentDate);
		setEnd(endDate);
	}, []);

	const handleChangeDate = (e) => {
		if (e.target.value) {
			setCurrent(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData(e.target);

			const data = {
				userID: userID,
				productName: formData.get("productName"),
				productPrice: formData.get("productPrice"),
				productQuantity: formData.get("productQuantity"),
				productDate: formData.get("productDate"),
			};

			mainService
				.postPurchase(data)
				.then((res) => {
					if (res && res === 200) {
						setLoading(false);
						props.onHide();
					}
				})
				.catch((err) => {
					setMessage("Có lỗi xảy ra.");
				});
		} catch (error) {
			setMessage("Có lỗi xảy ra.");
		}
	};

	return loading ? (
		<Loader loading={loading} />
	) : (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter">
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Thêm sản phẩm
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="show-grid">
				{message ? <Alert className="alert-dark">{message}</Alert> : ""}
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formProductName">
						<Form.Label>Sản phẩm</Form.Label>
						<Form.Control
							type="text"
							required
							placeholder="Tên sản phẩm"
							name="productName"
						/>
					</Form.Group>
					<Form.Row>
						<Col>
							<Form.Group
								className="mb-3"
								controlId="formProductPrice"
							>
								<Form.Label>Giá</Form.Label>
								<Form.Control
									type="number"
									required
									placeholder="Giá tiền"
									min="0"
									name="productPrice"
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group
								className="mb-3"
								controlId="formProductQuantity"
							>
								<Form.Label>Số lượng</Form.Label>
								<Form.Control
									type="number"
									required
									placeholder="Số lượng"
									min="1"
									name="productQuantity"
								/>
							</Form.Group>
						</Col>

						<Col>
							<Form.Group
								className="mb-3"
								controlId="formProductDate"
							>
								<Form.Label>Ngày mua</Form.Label>
								<Form.Control
									type="date"
									required
									defaultValue={current}
									onChange={handleChangeDate}
									max={end}
									name="productDate"
								/>
							</Form.Group>
						</Col>
					</Form.Row>
					<div className="text-right">
						<Button
							variant="primary"
							type="submit"
							className="mt-3 mb-2"
						>
							Thêm
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default AddModal;
