"use client";

import { useState } from "react";
import type { Employee } from "../../context";
import { DatePicker } from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

export default function EmployeePage({ initialEmployee, initialMode } : { initialEmployee: Employee, initialMode: "view" | "edit" }) {
    const [mode, setMode] = useState<"view" | "edit">(initialMode);
    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    console.log(employee);
    if (mode === "edit") {
        return (
            <div>
                <DatePicker label={"Birth date"} />
                <h1>{employee.name}</h1>
                <p>{employee.surname}</p>
            </div>
        );
    }
    return (
        <div>
            <DatePicker label={"Birth date"} value={parseDate("2024-04-04")} isReadOnly />
            <h1>{employee.name}</h1>
            <p>{employee.surname}</p>
        </div>
  	);
}