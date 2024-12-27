"use client";

import { useState } from "react";
import { Input, Select, DatePicker, Button, SelectItem, Card, CardHeader, CardBody } from "@nextui-org/react";
import type { Employee } from "../../context";
import { useEmployeeColumns } from "../../context";
import { createEmployee, modifyEmployee, deleteEmployee } from "@/app/api";
import { toast } from "../../components/toast";

async function handleSave({ employee, mode }: { employee: Employee, mode: "add" | "view" | "edit", setMode: (mode: "add" | "view" | "edit") => void }) {
    const requiredKeys = ["name", "surname", "phone", "email", "gender", "tax_code", "employed"];
    for (const key of requiredKeys as (keyof Employee)[]) {
        if (!employee[key]) {
            toast.error("Please fill all required fields before saving");
            return;
        }
    }
    if (mode === "add") {
        try {
            employee.id = await createEmployee(employee);
            window.location.href = "/employees/" + employee.id;
            toast.success("Employee added successfully");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving the employee");
        }
    }
    if (mode === "edit") {
        try {
            employee.id = await modifyEmployee(employee);
            window.location.href = "/employees/" + employee.id;
            toast.success("Employee updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving the employee");
        }
    }
}

async function handleRemove(id: string) {
    try {
        await deleteEmployee(id);
        window.location.href = "/employees";
        toast.success("Employee deleted successfully");
    }
    catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting the employee");
    }
}

export default function EmployeePage({ initialEmployee, initialMode }: { initialEmployee: Employee, initialMode: "add" | "view" | "edit" }) {
    const [mode, setMode] = useState<"add" | "view" | "edit">(initialMode);
    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const employeeColumns = useEmployeeColumns();
    const handleInputChange = (field: keyof Employee, value: string | number | null | Record<string, Record<string, string>>) => {
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
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("name", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "surname")?.headerName}
                                value={employee.surname || ""} 
                                onChange={(e) => handleInputChange("surname", e.target.value)} 
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("surname", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "phone")?.headerName}
                                value={employee.phone || ""}
                                onChange={(e) => handleInputChange("phone", e.target.value.replace(/[^0-9+]/g, "").replace(/(?!^)\+/g, ""))}
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("phone", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "email")?.headerName}
                                value={employee.email || ""}
                                onChange={(e) => handleInputChange("email", e.target.value.toLowerCase())}
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("email", null) })}
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
                                    defaultSelectedKeys={[employee.gender || ""]}
                                    isRequired
                                >
                                    <SelectItem value="Male" key={"Male"}>Male</SelectItem>
                                    <SelectItem value="Female" key={"Female"}>Female</SelectItem>
                                    <SelectItem value="Other" key={"Other"}>Other</SelectItem>
                                </Select>
                            )}
                            <Input
                                label={employeeColumns.find(column => column.field === "tax_code")?.headerName}
                                value={employee.tax_code || ""} 
                                onChange={(e) => handleInputChange("tax_code", e.target.value.toUpperCase().replace(/\s/g, ""))}
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("tax_code", null) })}
                            />
                            {mode === "view" ? (
                                <Input 
                                    label={employeeColumns.find(column => column.field === "employed")?.headerName}
                                    value={employee.employed || ""}
                                    isReadOnly
                                />
                            ) : (
                                <Select
                                    label={employeeColumns.find(column => column.field === "employed")?.headerName}
                                    onChange={(e) => handleInputChange("employed", e.target.value)}
                                    defaultSelectedKeys={[employee.employed || ""]}
                                    isRequired
                                >
                                    <SelectItem value="Yes" key={"Yes"}>Yes</SelectItem>
                                    <SelectItem value="No" key={"No"}>No</SelectItem>
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
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_city", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "birthplace_provincia")?.headerName}
                                value={employee.birthplace_provincia || ""} 
                                onChange={(e) => handleInputChange("birthplace_provincia", e.target.value)} 
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_provincia", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "birthplace_nation")?.headerName}
                                value={employee.birthplace_nation || ""} 
                                onChange={(e) => handleInputChange("birthplace_nation", e.target.value)} 
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_nation", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "birthplace_zipcode")?.headerName}
                                value={employee.birthplace_zipcode ? String(employee.birthplace_zipcode) : ""}
                                onChange={(e) => handleInputChange("birthplace_zipcode", e.target.value.replace(/[^\d]/g, ""))}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_zipcode", null) })}
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
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_address", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_city")?.headerName}
                                value={employee.livingplace_city || ""}
                                onChange={(e) => handleInputChange("livingplace_city", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_city", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_provincia")?.headerName}
                                value={employee.livingplace_provincia || ""}
                                onChange={(e) => handleInputChange("livingplace_provincia", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_provincia", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_nation")?.headerName}
                                value={employee.livingplace_nation || ""}
                                onChange={(e) => handleInputChange("livingplace_nation", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_nation", null) })}
                            />
                            <Input 
                                label={employeeColumns.find(column => column.field === "livingplace_zipcode")?.headerName}
                                value={employee.livingplace_zipcode ? String(employee.livingplace_zipcode) : ""}
                                onChange={(e) => handleInputChange("livingplace_zipcode", e.target.value.replace(/[^\d]/g, ""))}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_zipcode", null) })}
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
                            <>
                                <Button color="danger" onClick={() => employee.id ? handleRemove(employee.id) : toast.error("An error occurred while deleting the employee")}>
                                    Delete
                                </Button>
                                <Button color="primary" onClick={() => setMode("edit")}>
                                    Edit
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}