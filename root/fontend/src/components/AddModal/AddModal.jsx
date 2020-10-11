import React, { useState, useContext } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import moment from 'moment';
import {
	Form,
	Input,
	Button,
	InputNumber,
	DatePicker,
	Row,
	Col,
	Checkbox,
} from 'antd';

import { HomeContext } from '../../context/HomeContext';
import { mainService } from '../../services/main.service';
import Loader from '../Loader/Loader';

function AddModal({ ...props }) {
	const { currentUser, membersName, getData } = useContext(HomeContext);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	// eslint-disable-next-line
	const handleSubmit = (values) => {
		setLoading(true);
		try {
			const data = {
				userID: currentUser._id,
				productName: values.productName,
				productPrice: values.productPrice,
				productQuantity: values.productQuantity,
				productDate: values.productDate.format('YYYY-MM-DD'),
				members: values['member-checkbox-group'],
			};

			mainService
				.postPurchase(data)
				.then((res) => {
					if (res && res === 200) {
						setLoading(false);
						props.onHide();
						getData();
					}
				})
				.catch((err) => {
					setMessage('Có lỗi xảy ra.');
				});
		} catch (error) {
			setMessage('Có lỗi xảy ra.');
		}
	};

	const layout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 18,
		},
	};

	const middleLayout = {
		labelCol: {
			span: 12,
		},
		wrapperCol: {
			span: 12,
		},
	};

	const tailLayout = {
		wrapperCol: {
			offset: 8,
			span: 16,
		},
	};

	const disableDate = (current) => {
		return (
			current &&
			(current < moment().startOf('month') ||
				current > moment().endOf('month'))
		);
	};

	return loading ? (
		<Loader loading={loading} />
	) : (
		<Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Thêm sản phẩm
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='show-grid'>
				{message ? <Alert className='alert-dark'>{message}</Alert> : ''}
				<Form
					{...layout}
					name='basic'
					initialValues={{
						productQuantity: 1,
						// eslint-disable-next-line
						['member-checkbox-group']: membersName.map(
							(member) => member._id
						),
						productDate: moment(),
					}}
					onFinish={handleSubmit}
				>
					<Form.Item
						label='Tên sản phẩm'
						name='productName'
						rules={[
							{
								required: true,
								message: 'Vui lòng nhập tên sản phẩm!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Row>
						<Col span={12}>
							<Form.Item
								{...middleLayout}
								label='Giá'
								name='productPrice'
								rules={[
									{
										required: true,
										message: 'Vui lòng nhập giá tiền!',
									},
								]}
							>
								<InputNumber
									min={0}
									formatter={(value) =>
										`$ ${value}`.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											','
										)
									}
									p
									arser={(value) =>
										value.replace(/\$\s?|(,*)/g, '')
									}
									step={1000}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								{...middleLayout}
								label='Số lượng'
								name='productQuantity'
								rules={[
									{
										required: true,
										message: 'Vui lòng nhập số lượng!',
									},
								]}
							>
								<InputNumber min={1} />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item
						label='Ngày'
						name='productDate'
						rules={[
							{
								required: true,
								message: 'Vui lòng nhập ngày!',
							},
						]}
					>
						<DatePicker
							id='formProductDate'
							picker='date'
							disabledDate={disableDate}
							format='DD-MM-YYYY'
						/>
					</Form.Item>
					<Form.Item name='member-checkbox-group' label='Tham gia'>
						<Checkbox.Group>
							<Row>
								{membersName.map((member, index) => (
									<Col span={12} key={index + 1}>
										<Checkbox
											value={member._id}
											style={{ lineHeight: '32px' }}
										>
											{member.name}
										</Checkbox>
									</Col>
								))}
							</Row>
						</Checkbox.Group>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button type='primary' htmlType='submit'>
							Thêm
						</Button>
					</Form.Item>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default AddModal;
