"use client";

import { useEmployees } from "../context";

export default function EmployeePage() {
	const employees = useEmployees() || [];
	return (
		<div>
			<h1>Employees</h1>
			<ul>
				{employees.map((employee) => (
					<li key={employee.id}>{employee.name}</li>
				))}
			</ul>
		</div>
	);
};