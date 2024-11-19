"use client";

import { useState } from "react";
import type { Employee } from "../../context";

export default function EmployeePage(employee: Employee, initialMode: "edit" | "view") {
    const [mode, setMode] = useState(initialMode);
    
    return (
        <div>
            <h1>{employee.name}</h1>
            <p>{employee.surname}</p>
        </div>
  	);
}