import React from "react";
import { Table } from "antd";
// import { Table } from "react-bootstrap";
import moment from "moment";

export default function History({ purchase }) {
	const data = purchase.map((item, index) => {
		let itemData = {
			key: index + 1,
			stt: index + 1,
			name: item.productName,
			date: moment(item.date).format("DD-MM-YYYY"),
			price: new Intl.NumberFormat("vi-VN", {
				style: "currency",
				currency: "VND",
			}).format(item.price),
			quantity: item.quantity,
			totalPrice: new Intl.NumberFormat("vi-VN", {
				style: "currency",
				currency: "VND",
			}).format(item.totalPrice),
		};
		return itemData;
	});

	const columns = [
		{
			title: "STT",
			dataIndex: "stt",
		},
		{
			title: "Sản phẩm",
			dataIndex: "name",
		},
		{
			title: "Thời gian",
			dataIndex: "date",
			defaultSortOrder: "ascend",
			sorter: (a, b) =>
				moment(a.date, "DD-MM-YYYY").unix() -
				moment(b.date, "DD-MM-YYYY").unix(),
		},
		{
			title: "Giá",
			dataIndex: "price",
		},
		{
			title: "Số lượng",
			dataIndex: "quantity",
		},
		{
			title: "Tổng tiền",
			dataIndex: "totalPrice",
			sorter: (a, b) =>
				// eslint-disable-next-line
				Number(a.totalPrice.replace(/([^0-9\-])/g, "")) -
				// eslint-disable-next-line
				Number(b.totalPrice.replace(/([^0-9\-])/g, "")),
		},
	];

	return (
		// <Table striped bordered responsive>
		// 	<thead>
		// 		<tr>
		// 			<th>#</th>
		// 			<th>Sản phẩm</th>
		// 			<th>Thời gian</th>
		// 			<th>Giá</th>
		// 			<th>Số lượng</th>
		// 			<th>Tổng tiền</th>
		// 		</tr>
		// 	</thead>
		// 	<tbody>
		// 		{purchase &&
		// 			purchase.map((item, index) => (
		// 				<tr key={index}>
		// 					<td>{index + 1}</td>
		// 					<td>{item.productName}</td>
		// 					<td>{moment(item.date).format("DD-MM-YYYY")}</td>
		// 					<td>{item.price}</td>
		// 					<td>{item.quantity}</td>
		// 					<td>{item.totalPrice}</td>
		// 				</tr>
		// 			))}
		// 	</tbody>
		// </Table>
		<Table
			dataSource={data}
			columns={columns}
			pagination={false}
			scroll={{ x: 400 }}
		/>
	);
}
