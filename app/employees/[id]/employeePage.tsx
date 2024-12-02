"use client";

import { useState } from "react";
import { Input, Select, DatePicker, Button, SelectItem, Card, CardHeader, CardBody } from "@nextui-org/react";
import type { Employee } from "../../context";
import { useEmployeeColumns } from "../../context";

function handleSave({ employee, mode, setMode }: { employee: Employee, mode: "add" | "view" | "edit", setMode: (mode: "add" | "view" | "edit") => void }) {
    
}

export default function EmployeePage({ initialEmployee, initialMode }: { initialEmployee: Employee, initialMode: "add" | "view" | "edit" }) {
    const [mode, setMode] = useState<"add" | "view" | "edit">(initialMode);
    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const employeeColumns = useEmployeeColumns();
    const handleInputChange = (field: keyof Employee, value: any) => {
        setEmployee(prev => ({ ...prev, [field]: value }));
    };
    console.log(employee);
    const title = mode === "add" ? "Add New Employee" : mode === "edit" ? "Edit Employee" : "Employee Details";
    return (
        <>
            <h1 className="text-4xl font-bold text-center m-8">{title}</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-8 w-full container mx-auto">
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-medium">Personal Informations</h2>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                            <Input 
                                label={employeeColumns.find(column => column.field === "name")?.headerName}
                                value={employee.name || ""}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                onClear={() => handleInputChange("name", null)}
                                isRequired isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "surname")?.headerName}
                                value={employee.surname || ""} 
                                onChange={(e) => handleInputChange("surname", e.target.value)} 
                                onClear={() => handleInputChange("surname", null)}
                                isRequired isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "phone")?.headerName}
                                value={employee.phone || ""}
                                onChange={(e) => handleInputChange("phone", e.target.value.replace(/[^0-9+]/g, "").replace(/(?!^)\+/g, ""))}
                                onClear={() => handleInputChange("phone", null)}
                                isRequired isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "email")?.headerName}
                                value={employee.email || ""}
                                onChange={(e) => handleInputChange("email", e.target.value)} 
                                onClear={() => handleInputChange("email", null)}
                                isRequired isClearable isReadOnly={mode === "view"}
                                type="email"
                            />
                            {mode === "view" ? (
                                <Input 
                                    label={employeeColumns.find(column => column.field === "gender")?.headerName}
                                    value={employee.gender || ""}
                                    isReadOnly
                                />
                            ) : (
                                <Select
                                    label={employeeColumns.find(column => column.field === "gender")?.headerName}
                                    onChange={(e) => handleInputChange("gender", e.target.value)}
                                    isRequired
                                >
                                    <SelectItem value="Male" key={"male"}>Male</SelectItem>
                                    <SelectItem value="Female" key={"female"}>Female</SelectItem>
                                    <SelectItem value="Other" key={"other"}>Other</SelectItem>
                                </Select>
                            )}
                            <Input
                                label={employeeColumns.find(column => column.field === "tax_code")?.headerName}
                                value={employee.tax_code || ""} 
                                onChange={(e) => handleInputChange("tax_code", e.target.value.toUpperCase().replace(/\s/g, ""))}
                                onClear={() => handleInputChange("tax_code", null)}
                                isRequired isClearable isReadOnly={mode === "view"}
                            />
                            {mode === "view" ? (
                                <Input 
                                    label={employeeColumns.find(column => column.field === "employed")?.headerName}
                                    value={employee.employed ? employee.employed ? "True" : "False" : ""}
                                    isReadOnly
                                />
                            ) : (
                                <Select
                                    label={employeeColumns.find(column => column.field === "employed")?.headerName}
                                    onChange={(e) => handleInputChange("employed", e.target.value === "" ? null : e.target.value === "true" ? true : false)}
                                    isRequired
                                >
                                    <SelectItem value="True" key={"true"}>True</SelectItem>
                                    <SelectItem value="False" key={"false"}>False</SelectItem>
                                </Select>
                            )}
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-medium">Birth Informations</h2>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                            <DatePicker 
                                label={employeeColumns.find(column => column.field === "birthdate")?.headerName}
                                onChange={(e) => handleInputChange("birthdate", e ? new Date(e.toString()).getTime() : null)}
                                showMonthAndYearPickers isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "birthplace_city")?.headerName}
                                value={employee.birthplace_city || ""}
                                onChange={(e) => handleInputChange("birthplace_city", e.target.value)}
                                isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "birthplace_provincia")?.headerName}
                                value={employee.birthplace_provincia || ""} 
                                onChange={(e) => handleInputChange("birthplace_provincia", e.target.value)} 
                                isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "birthplace_nation")?.headerName}
                                value={employee.birthplace_nation || ""} 
                                onChange={(e) => handleInputChange("birthplace_nation", e.target.value)} 
                                isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "birthplace_zipcode")?.headerName}
                                value={employee.birthplace_zipcode ? String(employee.birthplace_zipcode) : ""}
                                onChange={(e) => handleInputChange("birthplace_zipcode", e.target.value.replace(/[^\d]/g, ""))}
                                onClear={() => handleInputChange("birthplace_zipcode", null)}
                                isClearable isReadOnly={mode === "view"}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-medium">Living Informations</h2>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_address")?.headerName}
                                value={employee.livingplace_address || ""} 
                                onChange={(e) => handleInputChange("livingplace_address", e.target.value)}
                                isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_city")?.headerName}
                                value={employee.livingplace_city || ""}
                                onChange={(e) => handleInputChange("livingplace_city", e.target.value)}
                                isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_provincia")?.headerName}
                                value={employee.livingplace_provincia || ""}
                                onChange={(e) => handleInputChange("livingplace_provincia", e.target.value)}
                                isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_nation")?.headerName}
                                value={employee.livingplace_nation || ""}
                                onChange={(e) => handleInputChange("livingplace_nation", e.target.value)}
                                isClearable isReadOnly={mode === "view"}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_zipcode")?.headerName}
                                value={employee.livingplace_zipcode ? String(employee.livingplace_zipcode) : ""}
                                onChange={(e) => handleInputChange("livingplace_zipcode", e.target.value.replace(/[^\d]/g, ""))}
                                isClearable isReadOnly={mode === "view"}
                            />
                        </CardBody>
                    </Card>
                    <div className="flex justify-end gap-4">
                        {mode === "add" || mode === "edit" ? (
                            <>
                                <Button color="secondary" onClick={() => mode === "add" ? window.location.href = "/employees" : setMode("view")}>
                                    Cancel
                                </Button>
                                <Button color="primary" onClick={() => handleSave({ employee, mode, setMode })}>
                                    Save
                                </Button>
                            </>
                        ) : (
                            <Button color="primary" onClick={() => setMode("edit")}>
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}