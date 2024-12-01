"use client";

import { useEmployees } from "../../context";
import { useState } from "react";
import type { Employee } from "../../context";
import EmployeePage from "./employeePage";
import { notFound } from "next/navigation";
import Navigation from "../../components/navigation";

export default function Page({ params } : { params: { id: string } }) {
	const [employee, setEmployee] = useState(undefined as Employee | undefined | null);
	const employees = useEmployees();
	const id = params.id;
	function emptyEmployee(): Employee {
		return {
			birthdate: null,
			birthplace_city: null,
			birthplace_nation: null,
			birthplace_provincia: null,
			document: null,
			email: null,
			employed: null,
			gender: null,
			livingplace_address: null,
			livingplace_nation: null,
			livingplace_provincia: null,
			livingplace_zipcode: null,
			n_mat: null,
			n_pro: null,
			name: null,
			phone: null,
			surname: null,
			tax_code: null,
			qualifications: {}
		};
	}
	if (id === "add-new") {
		return (
			<>
				<Navigation itemActive="Employees" />
				<EmployeePage initialEmployee={emptyEmployee()} initialMode="add" />
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
		return notFound();
	} else {
		return (
			<>
				<Navigation itemActive="Employees" />
				<EmployeePage initialEmployee={employee} initialMode="view" />
			</>
		);
	}
}