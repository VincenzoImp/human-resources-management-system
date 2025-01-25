"use client";

import EmployeesTable from "@/app/risorse/employeesTable";
import { useText } from "@/app/context";

export default function Employees() {
	const text = useText();
	return (
		<>
			<h1 className="text-4xl font-bold text-center m-8">{text.employees.employees}</h1>
			<EmployeesTable />
		</>
	);
}