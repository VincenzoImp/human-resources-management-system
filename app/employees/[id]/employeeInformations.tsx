"use client";

import { useCallback, useMemo } from "react";
import { Employee, useText } from "@/app/context";
import { Card, CardBody, CardHeader, DateInput, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";
import { useEmployee, useMode } from "@/app/employees/[id]/context";

export default function EmployeeInformations() {
    
    const { employee, setEmployee } = useEmployee();
    const { mode } = useMode();
    const text = useText();
    
    const handleInputChange = useCallback((field: keyof Employee, value: string | number | null | Record<string, Record<string, string>>) => {
        if (employee){
            setEmployee({ ...employee, [field]: value });
        }
    }, [employee, setEmployee]);

    const personalInformationsCard = useMemo(() => (
        employee ? (
            <div className="container mx-auto">
			    <Card className="mx-2">
                    <CardHeader>
                        <h2 className="text-lg font-medium">{text.employeeInformations.personalInformations}</h2>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                        <Input 
                            label={text.employeeAttributes.name}
                            value={employee.name || ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            isDisabled={mode === "view" && !employee.name}
                            {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("name", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.surname}
                            value={employee.surname || ""} 
                            onChange={(e) => handleInputChange("surname", e.target.value)} 
                            isDisabled={mode === "view" && !employee.surname}
                            {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("surname", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.phone}
                            value={employee.phone || ""}
                            onChange={(e) => handleInputChange("phone", e.target.value.replace(/[^0-9+]/g, "").replace(/(?!^)\+/g, ""))}
                            isDisabled={mode === "view" && !employee.phone}
                            {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("phone", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.email}
                            value={employee.email || ""}
                            onChange={(e) => handleInputChange("email", e.target.value.toLowerCase())}
                            isDisabled={mode === "view" && !employee.email}
                            {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("email", null) })}
                            type="email"
                        />
                        {mode === "view" ? (
                            <Input 
                                label={text.employeeAttributes.gender}
                                value={text.other[employee.gender as string] || ""}
                                isDisabled={!employee.gender}
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
                            label={text.employeeAttributes.taxCode}
                            value={employee.taxCode || ""} 
                            onChange={(e) => handleInputChange("taxCode", e.target.value.toUpperCase().replace(/\s/g, ""))}
                            isDisabled={mode === "view" && !employee.taxCode}
                            {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("taxCode", null) })}
                        />
                        {mode === "view" ? (
                            <Input 
                                label={text.employeeAttributes.employed}
                                value={text.other[employee.employed as string] || ""}
                                isDisabled={!employee.employed}
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
            </div>
        ) : null
    ), [employee, handleInputChange, mode, text]);
    
    const birthInformationsCard = useMemo(() => (
        employee ? (
            <div className="container mx-auto">
			    <Card className="mx-2">
                    <CardHeader>
                        <h2 className="text-lg font-medium">{text.employeeInformations.birthInformations}</h2>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                        {mode === "view" ? (
                            <I18nProvider locale="it-IT">
                                <DateInput 
                                    label={text.employeeAttributes.birthdate}
                                    defaultValue={employee.birthdate ? parseDate(employee.birthdate as string) : null}
                                    isDisabled={!employee.birthdate}
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
                            label={text.employeeAttributes.birthplaceCity}
                            value={employee.birthplaceCity || ""}
                            onChange={(e) => handleInputChange("birthplaceCity", e.target.value)}
                            isDisabled={mode === "view" && !employee.birthplaceCity}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplaceCity", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.birthplaceProvincia}
                            value={employee.birthplaceProvincia || ""} 
                            onChange={(e) => handleInputChange("birthplaceProvincia", e.target.value)}
                            isDisabled={mode === "view" && !employee.birthplaceProvincia}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplaceProvincia", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.birthplaceNation}
                            value={employee.birthplaceNation || ""} 
                            onChange={(e) => handleInputChange("birthplaceNation", e.target.value)}
                            isDisabled={mode === "view" && !employee.birthplaceNation}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplaceNation", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.birthplaceZipcode}
                            value={employee.birthplaceZipcode ? String(employee.birthplaceZipcode) : ""}
                            onChange={(e) => handleInputChange("birthplaceZipcode", e.target.value.replace(/[^\d]/g, ""))}
                            isDisabled={mode === "view" && !employee.birthplaceZipcode}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplaceZipcode", null) })}
                        />
                    </CardBody>
                </Card>
            </div>
        ) : null
    ), [employee, handleInputChange, mode, text]);

    const livingInformationsCard = useMemo(() => (
        employee ? (
            <div className="container mx-auto">
			    <Card className="mx-2">
                    <CardHeader>
                        <h2 className="text-lg font-medium">{text.employeeInformations.livingInformations}</h2>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                        <Input 
                            label={text.employeeAttributes.livingplaceAddress}
                            value={employee.livingplaceAddress || ""} 
                            onChange={(e) => handleInputChange("livingplaceAddress", e.target.value)}
                            isDisabled={mode === "view" && !employee.livingplaceAddress}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplaceAddress", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.livingplaceCity}
                            value={employee.livingplaceCity || ""}
                            onChange={(e) => handleInputChange("livingplaceCity", e.target.value)}
                            isDisabled={mode === "view" && !employee.livingplaceCity}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplaceCity", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.livingplaceProvincia}
                            value={employee.livingplaceProvincia || ""}
                            onChange={(e) => handleInputChange("livingplaceProvincia", e.target.value)}
                            isDisabled={mode === "view" && !employee.livingplaceProvincia}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplaceProvincia", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.livingplaceNation}
                            value={employee.livingplaceNation || ""}
                            onChange={(e) => handleInputChange("livingplaceNation", e.target.value)}
                            isDisabled={mode === "view" && !employee.livingplaceNation}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplaceNation", null) })}
                        />
                        <Input 
                            label={text.employeeAttributes.livingplaceZipcode}
                            value={employee.livingplaceZipcode ? String(employee.livingplaceZipcode) : ""}
                            onChange={(e) => handleInputChange("livingplaceZipcode", e.target.value.replace(/[^\d]/g, ""))}
                            isDisabled={mode === "view" && !employee.livingplaceZipcode}
                            {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplaceZipcode", null) })}
                        />
                    </CardBody>
                </Card>
            </div>
        ) : null
    ), [employee, handleInputChange, mode, text]);

    return (
        <>
            {personalInformationsCard}
            {birthInformationsCard}
            {livingInformationsCard}
        </>
    );
}
