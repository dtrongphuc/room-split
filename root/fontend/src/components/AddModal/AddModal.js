import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

function AddModal(props) {
	return (
		<Modal {...props} aria-labelledby="contained-modal-title-vcenter">
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Thêm sản phẩm
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>
					<Button variant="primary" type="submit">
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
