import React from "react";
import { Table } from "react-bootstrap";

export default class History extends React.Component {
	render() {
		return (
			<Table striped bordered>
				<thead>
					<tr>
						<th>#</th>
						<th>Sản phẩm</th>
						<th>Thời gian</th>
						<th>Giá</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
					</tr>
					<tr>
						<td>2</td>
						<td>2</td>
						<td>2</td>
						<td>2</td>
					</tr>
				</tbody>
			</Table>
		);
	}
}
