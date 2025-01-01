"use client";

import { useEffect } from "react";
import type { Employee } from "@/app/context";
import EmployeePage from "@/app/employees/[id]/employeePage";
import { notFound } from "next/navigation";
import Navigation from "@/app/components/navigation";
import { readEmployee } from "@/app/api";
import { toast } from "@/app/components/toast";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import Footer from "@/app/components/footer";

export default function Page({ params } : { params: { id: string } }) {
	function emptyEmployee(): Employee {
		return {
			birthdate: null,
			birthplace_city: null,
			birthplace_nation: null,
			birthplace_provincia: null,
			birthplace_zipcode: null,
			documents: null,
			email: null,
			employed: null,
			gender: null,
			livingplace_address: null,
			livingplace_city: null,
			livingplace_nation: null,
			livingplace_provincia: null,
			livingplace_zipcode: null,
			// n_mat: null,
			// n_pro: null,
			name: null,
			phone: null,
			surname: null,
			tax_code: null,
			qualifications: {},
		};
	}
	const employeeId = params.id;
	const { mode, setMode } = useMode();
	const { employee, setEmployee } = useEmployee();
	useEffect(() => {
		const fetchEmployee = async () => {
			if (employee === undefined) {
				if (employeeId === "add-new") {
					setEmployee(emptyEmployee());
				} else {
					try {
						const employee = await readEmployee(employeeId);
						setEmployee(employee);
					} catch (error: unknown) {
						if (error instanceof Error) {
							toast.error(error.message);
						}
					}
				}
			}
		};
		const fetchMode = () => {
			if (mode === undefined) {
				if (employeeId === "add-new") {
					setMode("add");
				} else {
					setMode("view");
				}
			}
		};
		fetchMode();
		fetchEmployee();
	}, [employeeId, setMode, setEmployee, employee, mode]);

	if (employee === undefined) {
		return null;
	} else if (employee === null) {
		return notFound();
	} else {
		return (
			<>
				<Navigation itemActive="employees" />
				<EmployeePage/>
				<Footer/>
			</>
		);
	}
}