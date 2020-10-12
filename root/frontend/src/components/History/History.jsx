import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Table, Popconfirm, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

import { HomeContext } from '../../context/HomeContext';
const { Text, Title } = Typography;

export default function History(props) {
	const { id, purchase, expense, loading } = props;
	const { handleDeletePurchase, currentUser } = useContext(HomeContext);

	// functions
	const handleDelete = (key) => {
		handleDeletePurchase(key);
		const dataFilter = dataTable.filter((item) => item.key !== key);
		setDataTable(dataFilter);
	};

	// get data
	const getDataTable = useCallback(() => {
		return purchase.map((item, index) => {
			let itemData = {
				key: item._id,
				stt: index + 1,
				name: item.productName,
				date: moment(item.date).format('DD-MM-YYYY'),
				price: new Intl.NumberFormat('vi-VN', {
					style: 'currency',
					currency: 'VND',
				}).format(item.price),
				quantity: item.quantity,
				totalPrice: new Intl.NumberFormat('vi-VN', {
					style: 'currency',
					currency: 'VND',
				}).format(item.totalPrice),
				description: item.members.map((member) => (
					<li key={member.realname}>
						<Text code>{member.realname}</Text>
					</li>
				)),
			};
			return itemData;
		});
	}, [purchase]);

	// state
	const [dataTable, setDataTable] = useState(getDataTable());
	const [columns] = useState([
		{
			title: 'STT',
			dataIndex: 'stt',
			width: '60px',
		},
		{
			title: 'Sản phẩm',
			dataIndex: 'name',
		},
		{
			title: 'Thời gian',
			dataIndex: 'date',
			defaultSortOrder: 'ascend',
			sorter: (a, b) =>
				moment(a.date, 'DD-MM-YYYY').unix() -
				moment(b.date, 'DD-MM-YYYY').unix(),
		},
		{
			title: 'Giá',
			dataIndex: 'price',
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			width: '10%',
			align: 'center',
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'totalPrice',
			sorter: (a, b) =>
				// eslint-disable-next-line
				Number(a.totalPrice.replace(/([^0-9\-])/g, '')) -
				// eslint-disable-next-line
				Number(b.totalPrice.replace(/([^0-9\-])/g, '')),
		},
		{
			title: 'Chức năng',
			dataIndex: 'operation',
			render: (text, record) => {
				return isEmpty && id === currentUser._id ? (
					<Popconfirm
						title='Chắc chắn xoá?'
						onConfirm={() => handleDelete(record.key)}
					>
						<Button
							icon={<DeleteOutlined />}
							size='small'
							className='d-flex align-items-center'
						>
							Xoá
						</Button>
					</Popconfirm>
				) : null;
			},
		},
	]);
	const [footer, setFooter] = useState('');
	const [isEmpty, setIsEmpty] = useState(true);

	useEffect(() => {
		const data = getDataTable();
		setDataTable(data);
		if (data.length > 0) {
			setIsEmpty(false);
		} else {
			setIsEmpty(true);
		}

		if (expense > 0) {
			setFooter(
				'+' +
					new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(expense)
			);
		} else {
			setFooter(
				new Intl.NumberFormat('vi-VN', {
					style: 'currency',
					currency: 'VND',
				}).format(expense)
			);
		}
	}, [expense, getDataTable]);

	return (
		<Table
			dataSource={dataTable}
			columns={columns}
			size='small'
			bordered
			expandable={{
				rowExpandable: (record) => record.description.length !== 0,
				expandedRowRender: (record) => (
					<ul>
						<Title level={5}>Thành viên:</Title>
						{record.description}
					</ul>
				),
			}}
			pagination={false}
			scroll={{ x: 400, y: 380 }}
			footer={() => footer}
			loading={loading}
		/>
	);
}
