import React from "react";
import { Table } from 'reactstrap';
import './style.css'
export default function TableChange() {
	return (
		<div>
			<Table borderless>
				<thead>
					<tr className="table-header">
						<th>Subject Name</th>
						<th>Code</th>
						<th>Notes</th>
						<th>PYQP</th>
						<th>Books</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Mechanics of Solid</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope="row">Structural Analysis</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
						<td>@fat</td>
					</tr>
					<tr>
						<th scope="row">Linear Algerbra</th>
						<td>Larry</td>
						<td>the Bird</td>
						<td>@twitter</td>
						<td>@twitter</td>
					</tr>
					<tr>
						<th scope="row">Linear Algerbra</th>
						<td>Larry</td>
						<td>the Bird</td>
						<td>@twitter</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}