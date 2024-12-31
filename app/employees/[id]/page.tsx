"use client";

import { useEffect, useState } from "react";
import type { Employee } from "@/app/context";
import EmployeePage from "./employeePage";
import { notFound } from "next/navigation";
import Navigation from "@/app/components/navigation";
import { Authenticated } from "@/app/modifiers";
import { readEmployee } from "@/app/api";
import { toast } from "@/app/components/toast";

export default function Page({ params } : { params: { id: string } }) {
	const [employee, setEmployee] = useState<Employee | null | undefined>(undefined);
	useEffect(() => {
		const fetchEmployee = async () => {
			if (employee === undefined) {
				try {
					const employee = await readEmployee(params.id);
					setEmployee(employee);
				} catch (error: unknown) {
					if (error instanceof Error) {
						toast.error(error.message);
					}
				}
			}
		};
		fetchEmployee();
	}, [params.id, setEmployee]);
	const id = params.id;
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
			qualifications: {}
		};
	}
	if (id === "add-new") {
		return (
			<Authenticated>
				<Navigation itemActive="employees" />
				<EmployeePage initialEmployee={emptyEmployee()} initialMode="add" />
			</Authenticated>
		)
	} else if (employee === undefined) {
		return null;
	} else if (employee === null) {
		return notFound();
	} else {
		return (
			<Authenticated>
				<Navigation itemActive="employees" />
				<EmployeePage initialEmployee={employee} initialMode="view" />
			</Authenticated>
		);
	}
}