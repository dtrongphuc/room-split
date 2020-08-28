import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";
import moment from "moment";

function AddModal(props) {
	const [current, setCurrent] = useState("");
	const [end, setEnd] = useState("");

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
	};

	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter">
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Thêm sản phẩm
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formProductName">
						<Form.Label>Sản phẩm</Form.Label>
						<Form.Control
							type="text"
							required
							placeholder="Tên sản phẩm"
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
								/>
							</Form.Group>
						</Col>
					</Form.Row>
					<Button
						variant="primary"
						type="submit"
						className="mt-3 mb-2"
					>
						Submit
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddModal;
