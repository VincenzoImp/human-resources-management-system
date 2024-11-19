"use client";

import { useEmployees } from "../../context";
import { useState } from "react";
import type { Employee } from "../../context";
import AddNewPage from "./addNewPage";
import EmployeePage from "./employeePage";

export default function Page({ params } : { params: { id: string } }) {
	const [employee, setEmployee] = useState(undefined as Employee | undefined | null);
	const employees = useEmployees();
	const id = params.id;
	if (id === "add-new") {
		return (
			<>
				{AddNewPage()}
			</>
		)
	}
	if (employees) {
		if (employee === undefined) {
			const foundEmployee = employees.find(employee => employee.id === id);
			setEmployee(foundEmployee || null);
		}
	}
	if (employee === undefined) {
		return null;
	} else if (employee === null) {
		return (
			<>
				<h1>Employee not found</h1>
			</>
		)
	} else {
		return (
			<>
				{EmployeePage(employee, "view")}
			</>
		);
	}
}