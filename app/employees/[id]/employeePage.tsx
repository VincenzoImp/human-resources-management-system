"use client";

import { useEffect, useState } from "react";
import { Input, Select, DatePicker, DateInput, Button, SelectItem, Card, CardHeader, CardBody, Table, TableHeader, TableBody, TableRow, TableCell, TableColumn, Chip, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Slider, Tooltip } from "@nextui-org/react";
import type { Employee } from "../../context";
import { useText } from "../../context";
import { createEmployee, modifyEmployee, deleteEmployee } from "@/app/api";
import { toast } from "../../components/toast";
import { parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { DeleteIcon, EditIcon, PlusIcon } from "@/app/icons";

async function handleSave({ employee, mode, saveSuccessText, fillRequiredFieldsText, setMode }: { employee: Employee, mode: "add" | "edit", saveSuccessText: string, fillRequiredFieldsText: string, setMode: React.Dispatch<React.SetStateAction<"add" | "view" | "edit">> }) {
    const requiredKeys = ["name", "surname", "phone", "email", "gender", "tax_code", "employed"];
    for (const key of requiredKeys as (keyof Employee)[]) {
        if (!employee[key]) {
            toast.error(fillRequiredFieldsText);
            return;
        }
    }
    if (mode === "add") {
        createEmployee(employee).then((res: string) => {
            employee.id = res;
            setMode("view");
            toast.success(saveSuccessText);
            window.location.href = `/employees/${res}`;
        }).catch((error: Error) => {
            toast.error(error.message);
        });
    }
    if (mode === "edit") {
        modifyEmployee(employee).then(() => {
            setMode("view");
            toast.success(saveSuccessText);
        }).catch((error: Error) => {
            toast.error(error.message);
        });
    }
}

async function handleRemove(id: string, deleteSuccessText: string) {
    deleteEmployee(id).then(() => {
        toast.success(deleteSuccessText);
        window.location.href = "/employees";
    }).catch ((error: Error) => {
        toast.error(error.message);
    });
}

export default function EmployeePage({ initialEmployee, initialMode }: { initialEmployee: Employee, initialMode: "add" | "view" | "edit" }) {
    const [mode, setMode] = useState<"add" | "view" | "edit">(initialMode);
    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const text = useText();
    const [saveSuccessText, setSaveSuccessText] = useState<string | undefined>(undefined);
    useEffect(() => {
        if (mode === "add") {
            setSaveSuccessText(text.employeePage.addSuccess);
        }
        if (mode === "edit") {
            setSaveSuccessText(text.employeePage.editSuccess);
        }
    }, [mode, text]);

    const handleInputChange = (field: keyof Employee, value: string | number | null | Record<string, Record<string, string>>) => {
        setEmployee(prev => ({ ...prev, [field]: value }));
    };
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const title = mode === "add" ? text.employeePage.addTitle : mode === "edit" ? text.employeePage.editTitle : text.employeePage.viewTitle;
    return (
        <>
            <h1 className="text-4xl font-bold text-center m-8">{title}</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-8 w-full container mx-auto">
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-medium">{text.employeePage.personalInformations}</h2>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                            <Input 
                                label={text.employeeAttributes.name}
                                value={employee.name || ""}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("name", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.surname}
                                value={employee.surname || ""} 
                                onChange={(e) => handleInputChange("surname", e.target.value)} 
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("surname", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.phone}
                                value={employee.phone || ""}
                                onChange={(e) => handleInputChange("phone", e.target.value.replace(/[^0-9+]/g, "").replace(/(?!^)\+/g, ""))}
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("phone", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.email}
                                value={employee.email || ""}
                                onChange={(e) => handleInputChange("email", e.target.value.toLowerCase())}
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("email", null) })}
                                type="email"
                            />
                            {mode === "view" ? (
                                <Input 
                                    label={text.employeeAttributes.gender}
                                    value={employee.gender || ""}
                                    isReadOnly
                                />
                            ) : (
                                <Select
                                    label={text.employeeAttributes.gender}
                                    onChange={(e) => handleInputChange("gender", e.target.value)}
                                    defaultSelectedKeys={[employee.gender || ""]}
                                    isRequired
                                >
                                    <SelectItem value="male" key={"male"}>{text.other.male}</SelectItem>
                                    <SelectItem value="female" key={"female"}>{text.other.female}</SelectItem>
                                    <SelectItem value="other" key={"other"}>{text.other.other}</SelectItem>
                                </Select>
                            )}
                            <Input
                                label={text.employeeAttributes.tax_code}
                                value={employee.tax_code || ""} 
                                onChange={(e) => handleInputChange("tax_code", e.target.value.toUpperCase().replace(/\s/g, ""))}
                                {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("tax_code", null) })}
                            />
                            {mode === "view" ? (
                                <Input 
                                    label={text.employeeAttributes.employed}
                                    value={employee.employed || ""}
                                    isReadOnly
                                />
                            ) : (
                                <Select
                                    label={text.employeeAttributes.employed}
                                    onChange={(e) => handleInputChange("employed", e.target.value)}
                                    defaultSelectedKeys={[employee.employed || ""]}
                                    isRequired
                                >
                                    <SelectItem value="yes" key={"yes"}>{text.other.yes}</SelectItem>
                                    <SelectItem value="no" key={"no"}>{text.other.no}</SelectItem>
                                </Select>
                            )}
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-medium">{text.employeePage.birthInformations}</h2>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                            {mode === "view" ? (
                                <I18nProvider locale="it-IT">
                                    <DateInput 
                                        label={text.employeeAttributes.birthdate}
                                        defaultValue={employee.birthdate ? parseDate(employee.birthdate as string) : null}
                                        isReadOnly
                                    />
                                </I18nProvider>
                            ) : (
                                <I18nProvider locale="it-IT">
                                    <DatePicker 
                                        label={text.employeeAttributes.birthdate}
                                        onChange={(e) => handleInputChange("birthdate", e ? e.toString() : null)}
                                        defaultValue={employee.birthdate ? parseDate(employee.birthdate as string) : null}
                                        showMonthAndYearPickers
                                    />
                                </I18nProvider>
                            )}
                            <Input 
                                label={text.employeeAttributes.birthplace_city}
                                value={employee.birthplace_city || ""}
                                onChange={(e) => handleInputChange("birthplace_city", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_city", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.birthplace_provincia}
                                value={employee.birthplace_provincia || ""} 
                                onChange={(e) => handleInputChange("birthplace_provincia", e.target.value)} 
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_provincia", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.birthplace_nation}
                                value={employee.birthplace_nation || ""} 
                                onChange={(e) => handleInputChange("birthplace_nation", e.target.value)} 
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_nation", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.birthplace_zipcode}
                                value={employee.birthplace_zipcode ? String(employee.birthplace_zipcode) : ""}
                                onChange={(e) => handleInputChange("birthplace_zipcode", e.target.value.replace(/[^\d]/g, ""))}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_zipcode", null) })}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-medium">{text.employeePage.livingInformations}</h2>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                            <Input 
                                label={text.employeeAttributes.livingplace_address}
                                value={employee.livingplace_address || ""} 
                                onChange={(e) => handleInputChange("livingplace_address", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_address", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.livingplace_city}
                                value={employee.livingplace_city || ""}
                                onChange={(e) => handleInputChange("livingplace_city", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_city", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.livingplace_provincia}
                                value={employee.livingplace_provincia || ""}
                                onChange={(e) => handleInputChange("livingplace_provincia", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_provincia", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.livingplace_nation}
                                value={employee.livingplace_nation || ""}
                                onChange={(e) => handleInputChange("livingplace_nation", e.target.value)}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_nation", null) })}
                            />
                            <Input 
                                label={text.employeeAttributes.livingplace_zipcode}
                                value={employee.livingplace_zipcode ? String(employee.livingplace_zipcode) : ""}
                                onChange={(e) => handleInputChange("livingplace_zipcode", e.target.value.replace(/[^\d]/g, ""))}
                                {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_zipcode", null) })}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader className="flex justify-between">
                            <h2 className="text-lg font-medium">{text.employeePage.qualifications}</h2>
                            {mode === "view" ? null : (
                                <Chip variant="light" className="inline-block" endContent={
                                    <Button size="sm" isIconOnly color="default" onPress={onOpen}>
                                        <PlusIcon />
                                    </Button>
                                }>
                                </Chip>
                            )}
                        </CardHeader>
                        <CardBody>
                            <Table removeWrapper>
                                <TableHeader>
                                    <TableColumn align="center">Qualification</TableColumn>
                                    <TableColumn align="center">Specification</TableColumn>
                                    <TableColumn align="center">Score</TableColumn>
                                    <TableColumn align="center">
                                        {mode === "view" ? null: "Actions"}
                                    </TableColumn>
                                </TableHeader>
                                <TableBody emptyContent={"Empty"}>
                                    <TableRow>
                                        <TableCell>High School Diploma</TableCell>
                                        <TableCell>Scientific</TableCell>
                                        <TableCell>5</TableCell>
                                        <TableCell>
                                            {mode === "view" ? null: (
                                                <div className="flex items-center justify-center gap-4">
                                                    <Tooltip content="Edit Qualification">
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                            <EditIcon />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip color="danger" content="Delete Qualification">
                                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                            <DeleteIcon />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                    <ModalHeader className="flex flex-col gap-1">Add Qualification</ModalHeader>
                                    <ModalBody>
                                        <Input 
                                            label={"Qualifications Name"}
                                            value={""}                                        
                                        />
                                        <Input 
                                            label={"Qualifications Specification"}
                                            value={""}
                                        />
                                        <Slider 
                                            label={"Qualifications Score"}
                                            defaultValue={0}
                                            maxValue={5}
                                            step={0.5}
                                            minValue={0}
                                            showTooltip={true}
                                            endContent={"5"}
                                            startContent={"0"}
                                            hideValue={true}
                                            showSteps={true}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                        Action
                                        </Button>
                                    </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                        </CardBody>
                    </Card>
                    <div className="flex justify-end gap-4">
                        {mode === "add" || mode === "edit" ? (
                            <>
                                <Button color="secondary" onClick={() => mode === "add" ? window.location.href = "/employees" : setMode("view")}>
                                    {text.employeePage.cancel}
                                </Button>
                                <Button color="primary" onClick={() => handleSave({ employee, mode, saveSuccessText: saveSuccessText as string, fillRequiredFieldsText: text.employeePage.fillRequiredFields, setMode })}>
                                    {text.employeePage.save}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="danger" onClick={() => employee.id ? handleRemove(employee.id as string, text.employeePage.deleteSuccess) : null}>
                                    {text.employeePage.delete}
                                </Button>
                                <Button color="primary" onClick={() => setMode("edit")}>
                                    {text.employeePage.edit}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}