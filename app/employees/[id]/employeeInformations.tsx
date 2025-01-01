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
            <Card>
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
                        label={text.employeeAttributes.tax_code}
                        value={employee.tax_code || ""} 
                        onChange={(e) => handleInputChange("tax_code", e.target.value.toUpperCase().replace(/\s/g, ""))}
                        isDisabled={mode === "view" && !employee.tax_code}
                        {...(mode === "view" ? { isReadOnly: true } : { isRequired: true, isClearable: true, onClear: () => handleInputChange("tax_code", null) })}
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
        ) : null
    ), [employee, handleInputChange, mode, text]);
    
    const birthInformationsCard = useMemo(() => (
        employee ? (
            <Card>
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
                        label={text.employeeAttributes.birthplace_city}
                        value={employee.birthplace_city || ""}
                        onChange={(e) => handleInputChange("birthplace_city", e.target.value)}
                        isDisabled={mode === "view" && !employee.birthplace_city}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_city", null) })}
                    />
                    <Input 
                        label={text.employeeAttributes.birthplace_provincia}
                        value={employee.birthplace_provincia || ""} 
                        onChange={(e) => handleInputChange("birthplace_provincia", e.target.value)}
                        isDisabled={mode === "view" && !employee.birthplace_provincia}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_provincia", null) })}
                    />
                    <Input 
                        label={text.employeeAttributes.birthplace_nation}
                        value={employee.birthplace_nation || ""} 
                        onChange={(e) => handleInputChange("birthplace_nation", e.target.value)}
                        isDisabled={mode === "view" && !employee.birthplace_nation}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_nation", null) })}
                    />
                    <Input 
                        label={text.employeeAttributes.birthplace_zipcode}
                        value={employee.birthplace_zipcode ? String(employee.birthplace_zipcode) : ""}
                        onChange={(e) => handleInputChange("birthplace_zipcode", e.target.value.replace(/[^\d]/g, ""))}
                        isDisabled={mode === "view" && !employee.birthplace_zipcode}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("birthplace_zipcode", null) })}
                    />
                </CardBody>
            </Card>
        ) : null
    ), [employee, handleInputChange, mode, text]);

    const livingInformationsCard = useMemo(() => (
        employee ? (
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-medium">{text.employeeInformations.livingInformations}</h2>
                </CardHeader>
                <CardBody className="flex flex-col gap-4 grid grid-cols-1 sm:grid-cols-2">
                    <Input 
                        label={text.employeeAttributes.livingplace_address}
                        value={employee.livingplace_address || ""} 
                        onChange={(e) => handleInputChange("livingplace_address", e.target.value)}
                        isDisabled={mode === "view" && !employee.livingplace_address}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_address", null) })}
                    />
                    <Input 
                        label={text.employeeAttributes.livingplace_city}
                        value={employee.livingplace_city || ""}
                        onChange={(e) => handleInputChange("livingplace_city", e.target.value)}
                        isDisabled={mode === "view" && !employee.livingplace_city}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_city", null) })}
                    />
                    <Input 
                        label={text.employeeAttributes.livingplace_provincia}
                        value={employee.livingplace_provincia || ""}
                        onChange={(e) => handleInputChange("livingplace_provincia", e.target.value)}
                        isDisabled={mode === "view" && !employee.livingplace_provincia}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_provincia", null) })}
                    />
                    <Input 
                        label={text.employeeAttributes.livingplace_nation}
                        value={employee.livingplace_nation || ""}
                        onChange={(e) => handleInputChange("livingplace_nation", e.target.value)}
                        isDisabled={mode === "view" && !employee.livingplace_nation}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_nation", null) })}
                    />
                    <Input 
                        label={text.employeeAttributes.livingplace_zipcode}
                        value={employee.livingplace_zipcode ? String(employee.livingplace_zipcode) : ""}
                        onChange={(e) => handleInputChange("livingplace_zipcode", e.target.value.replace(/[^\d]/g, ""))}
                        isDisabled={mode === "view" && !employee.livingplace_zipcode}
                        {...(mode === "view" ? { isReadOnly: true } : { isClearable: true, onClear: () => handleInputChange("livingplace_zipcode", null) })}
                    />
                </CardBody>
            </Card>
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
