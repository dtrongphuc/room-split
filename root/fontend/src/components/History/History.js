import React from "react";
import { Table } from "antd";
import moment from "moment";

export default function History({ purchase, priceOfMember, priceSplit }) {
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

	const calculatePrice = () => {
		let result = priceOfMember - priceSplit;

		if (result > 0) {
			return (
				"+" +
				new Intl.NumberFormat("vi-VN", {
					style: "currency",
					currency: "VND",
				}).format(result)
			);
		}
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(result);
	};

	return (
		<Table
			dataSource={data}
			columns={columns}
			pagination={false}
			scroll={{ x: 400 }}
			footer={calculatePrice}
		/>
	);
}
