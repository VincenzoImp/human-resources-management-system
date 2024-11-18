"use client";

import { useEmployees } from "@/app/context";

export default function Page({ params } : { params: { id: string } }) {
  if (params.id === "add-new") {
    return <div>Add new employee</div>;
  }
  const employees = useEmployees() || [];
  const employee = employees.find((employee) => employee.id === params.id);
  if (!employee) {
    return <div>Employee not found</div>;
  }
  return (
    <div>
      <h1>{employee.name}</h1>
      <p>{employee.surname}</p>
    </div>
  );
}