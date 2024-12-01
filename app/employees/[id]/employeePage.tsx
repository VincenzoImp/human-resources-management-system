"use client";

import { useState } from "react";
import { Input, Select, DatePicker, Button, SelectItem, Card, CardHeader, CardBody } from "@nextui-org/react";
import type { Employee } from "../../context";
import { useEmployeeColumns } from "../../context";

export default function EmployeePage({ initialEmployee, initialMode }: { initialEmployee: Employee, initialMode: "add" | "view" | "edit" }) {
    const [mode, setMode] = useState<"add" | "view" | "edit">(initialMode);
    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const employeeColumns = useEmployeeColumns();
    const handleInputChange = (field: keyof Employee, value: any) => {
        setEmployee(prev => ({ ...prev, [field]: value }));
    };
    console.log(employee);
    // title add/edit/view
    const title = mode === "add" ? "Add New Employee" : mode === "edit" ? "Edit Employee" : "Employee Details";
    if (mode === "add" || mode === "edit") {
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
                                    isRequired isClearable
                                />
                                <Input 
                                    label={employeeColumns.find(column => column.field === "surname")?.headerName}
                                    value={employee.surname || ""} 
                                    onChange={(e) => handleInputChange("surname", e.target.value)} 
                                    onClear={() => handleInputChange("surname", null)}
                                    isRequired isClearable
                                />
                                <Input 
                                    label={employeeColumns.find(column => column.field === "phone")?.headerName}
                                    value={employee.phone || ""}
                                    onChange={(e) => handleInputChange("phone", e.target.value.replace(/[^0-9+]/g, "").replace(/(?!^)\+/g, ""))}
                                    onClear={() => handleInputChange("phone", null)}
                                    isRequired isClearable
                                />
                                <Input 
                                    label={employeeColumns.find(column => column.field === "email")?.headerName}
                                    value={employee.email || ""}
                                    onChange={(e) => handleInputChange("email", e.target.value)} 
                                    onClear={() => handleInputChange("email", null)}
                                    isRequired isClearable
                                    type="email"
                                />
                                <Select
                                    label={employeeColumns.find(column => column.field === "gender")?.headerName}
                                    onChange={(e) => handleInputChange("gender", e.target.value)}
                                    isRequired
                                >
                                    <SelectItem value="Male" key={"male"}>Male</SelectItem>
                                    <SelectItem value="Female" key={"female"}>Female</SelectItem>
                                    <SelectItem value="Other" key={"other"}>Other</SelectItem>
                                </Select>
                                <Input
                                    label={employeeColumns.find(column => column.field === "tax_code")?.headerName}
                                    value={employee.tax_code || ""} 
                                    onChange={(e) => handleInputChange("tax_code", e.target.value.toUpperCase().replace(/\s/g, ""))}
                                    onClear={() => handleInputChange("tax_code", null)}
                                    isRequired isClearable
                                />
                                <Select
                                    label={employeeColumns.find(column => column.field === "employed")?.headerName}
                                    onChange={(e) => handleInputChange("employed", e.target.value === "" ? null : e.target.value === "true" ? true : false)}
                                    isRequired
                                >
                                    <SelectItem value="True" key={"true"}>True</SelectItem>
                                    <SelectItem value="False" key={"false"}>False</SelectItem>
                                </Select>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h2 className="text-lg font-medium">Birth Informations</h2>
                            </CardHeader>
                            <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                                <DatePicker 
                                    label={employeeColumns.find(column => column.field === "birthdate")?.headerName}
                                    value={employee.birthdate ? new Date(employee.birthdate) : null}
                                    onChange={(date) => handleInputChange("birthdate", date)}
                                    showMonthAndYearPickers
                                />
                                <Input 
                                    label={employeeColumns.find(column => column.field === "birthplace_city")?.headerName}
                                    value={employee.birthplace_city || ""} 
                                    onChange={(e) => handleInputChange("birthplace_city", e.target.value)} 
                                />
                                <Input 
                                    label={employeeColumns.find(column => column.field === "birthplace_provincia")?.headerName}
                                    value={employee.birthplace_provincia || ""} 
                                    onChange={(e) => handleInputChange("birthplace_provincia", e.target.value)} 
                                />
                                <Input 
                                    label={employeeColumns.find(column => column.field === "birthplace_nation")?.headerName}
                                    value={employee.birthplace_nation || ""} 
                                    onChange={(e) => handleInputChange("birthplace_nation", e.target.value)} 
                                />
                                <Input 
                                    label={employeeColumns.find(column => column.field === "birthplace_zipcode")?.headerName}
                                    value={employee.birthplace_zipcode ? String(employee.birthplace_zipcode) : ""}
                                    onChange={(e) => handleInputChange("birthplace_zipcode", e.target.value)}
                                    onClear={() => handleInputChange("birthplace_zipcode", null)}
                                    isRequired isClearable
                                    type="number"
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
                                />
                                <Input 
                                    label={employeeColumns.find(column => column.field === "livingplace_city")?.headerName}
                                    value={employee.livingplace_zipcode || ""} 
                                    onChange={(e) => handleInputChange("livingplace_zipcode", Number(e.target.value) || null)}
                                    type="number"
                                />
                                <Input 
                                    label="Provincia di Residenza" 
                                    value={employee.livingplace_provincia || ""} 
                                    onChange={(e) => handleInputChange("livingplace_provincia", e.target.value)} 
                                />
                                <Input 
                                    label="Nazione di Residenza" 
                                    value={employee.livingplace_nation || ""} 
                                    onChange={(e) => handleInputChange("livingplace_nation", e.target.value)} 
                                />
                            </CardBody>
                        </Card>

                        {/* Pulsanti di Azione */}
                        <div className="flex justify-end gap-4">
                            <Button color="secondary" onClick={() => setMode("view")}>
                                Annulla
                            </Button>
                            <Button color="primary" onClick={() => console.log(employee)}>
                                Salva
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return null;
}


// interface Employee {
//     document: string | null;
//     id?: string | null;
//     n_mat: number | null;
//     n_pro: number | null;
//     qualifications: Record<string, Record<string, string>>
// }