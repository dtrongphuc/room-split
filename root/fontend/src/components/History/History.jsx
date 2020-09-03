import React, { useState, useEffect, useContext, useCallback } from "react";
import { Table, Popconfirm } from "antd";
import moment from "moment";

import { HomeContext } from "../../context/HomeContext";

export default function History({ purchase, expense, loading }) {
	const getDataTable = useCallback(() => {
		return purchase.map((item, index) => {
			let itemData = {
				key: item._id,
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
				description: item.members.map((member) => (
					<span
						key={member.realname}
						style={{
							margin: "0 8px 0 0",
						}}
					>
						{member.realname}
					</span>
				)),
			};
			return itemData;
		});
	}, [purchase]);

	const [dataTable, setDataTable] = useState(getDataTable());
	const [columns] = useState([
		{
			title: "STT",
			dataIndex: "stt",
			width: "60px",
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
			width: "80px",
			align: "center",
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
		{
			title: "Chức năng",
			dataIndex: "operation",
			render: (text, record) =>
				dataTable.length > 0 ? (
					<Popconfirm
						title="Chắc chắn xoá?"
						onConfirm={() => handleDelete(record.key)}
					>
						<p>Xoá</p>
					</Popconfirm>
				) : null,
		},
	]);
	const [footer, setFooter] = useState("");

	const { handleDeletePurchase } = useContext(HomeContext);

	useEffect(() => {
		const data = getDataTable();
		console.log("Effect");
		setDataTable(data);

		if (expense > 0) {
			setFooter(
				"+" +
					new Intl.NumberFormat("vi-VN", {
						style: "currency",
						currency: "VND",
					}).format(expense)
			);
		} else {
			setFooter(
				new Intl.NumberFormat("vi-VN", {
					style: "currency",
					currency: "VND",
				}).format(expense)
			);
		}
	}, [expense, getDataTable]);

	const handleDelete = (key) => {
		console.log(key);
		handleDeletePurchase(key);
		const dataFilter = dataTable.filter((item) => item.key !== key);
		setDataTable(dataFilter);
	};

	return (
		<Table
			dataSource={dataTable}
			columns={columns}
			bordered
			expandable={{
				rowExpandable: (record) => record.description.length !== 0,
				expandedRowRender: (record) => (
					<span style={{ display: "inline-block" }}>
						{record.description}
					</span>
				),
			}}
			pagination={false}
			scroll={{ x: 400, y: 380 }}
			footer={() => footer}
			loading={loading}
		/>
	);
}
