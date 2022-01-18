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
				</tbody>
			</Table>
		</div>
	);
}