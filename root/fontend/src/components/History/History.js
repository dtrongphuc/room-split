import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

export default function History({ purchase }) {
	return (
		<Table striped bordered>
			<thead>
				<tr>
					<th>#</th>
					<th>Sản phẩm</th>
					<th>Thời gian</th>
					<th>Giá</th>
					<th>Số lượng</th>
					<th>Tổng tiền</th>
				</tr>
			</thead>
			<tbody>
				{purchase &&
					purchase.map((item, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{item.productName}</td>
							<td>{moment(item.date).format("DD-MM-YYYY")}</td>
							<td>{item.price}</td>
							<td>{item.quantity}</td>
							<td>{item.totalPrice}</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
}
