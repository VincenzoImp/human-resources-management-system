"use client";

import { useCallback, useMemo } from "react";
import { Button } from "@nextui-org/react";
import type { Employee } from "@/app/context";
import { useText } from "@/app/context";
import { createEmployee, modifyEmployee, deleteEmployee, readEmployee } from "@/app/api";
import { toast } from "@/app/components/toast";
import { useRouter } from "next/navigation";
import EmployeeInformations from "@/app/employees/[id]/employeeInformations";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import EmployeeQualifications from "@/app/employees/[id]/employeeQualifications";

async function save(employee: Employee, mode: string, saveSuccessText: string) {
    let toastText: string | null = null;
    let redirectPath: string | null = null;
    let success: boolean = false;
    if (mode === "add") {
        try {
            const id = await createEmployee(employee);
            employee.id = id;
            toastText = saveSuccessText;
            redirectPath = `/employees/${id}`;
            success = true;

        } catch (error: unknown) {
            if (error instanceof Error) {
                toastText = error.message;
            }
            success = false;
        }
    }
    if (mode === "edit") {
        try {
            const id = await modifyEmployee(employee);
            employee.id = id;
            toastText = saveSuccessText;
            redirectPath = `/employees/${id}`;
            success = true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                toastText = error.message;
            }
            success = false;
        }
    }
    return { toastText, redirectPath, success };
}

async function remove(id: string, deleteSuccessText: string) {
    let toastText: string | null = null;
    let redirectPath: string | null = null;
    let success: boolean = false;
    try {
        await deleteEmployee(id);
        toastText = deleteSuccessText;
        redirectPath = "/employees";
        success = true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toastText = error.message;
        }
        success = false;
    }
    return { toastText, redirectPath, success };
}

export default function EmployeePage() {

    const { mode, setMode } = useMode();
    const { employee, setEmployee } = useEmployee();
    const text = useText();
    const router = useRouter();
    const title = mode === "add" ? text.employeePage.addTitle : mode === "edit" ? text.employeePage.editTitle : text.employeePage.viewTitle;

    const handleSavePress = useCallback(async () => {
        if (!employee || !mode) return;
        const requiredKeys = ["name", "surname", "phone", "email", "gender", "taxCode", "employed"];
        for (const key of requiredKeys as (keyof Employee)[]) {
            if (!employee[key]) {
                toast.error(text.employeePage.fillRequiredFields);
                return;
            }
        }
        const saveSuccessText = mode === "add" ? text.employeePage.addSuccess : text.employeePage.editSuccess;
        const { toastText, redirectPath, success } = await save(employee, mode, saveSuccessText);
        console.log(toastText, redirectPath, success);
        if (success) {
            toast.success(toastText as unknown as string);
        } else {
            toast.error(toastText as unknown as string);
        }
        if (redirectPath) {
            router.push(redirectPath);
        }
        setMode("view");
        setEmployee(await readEmployee(employee.id as string));
    }, [employee, mode, router, text, setMode, setEmployee]);

    const handleCancelPress = useCallback(async () => {
        if (!employee || !mode) return;
        if (mode === "add") {
            router.push("/employees");
        } else {
            setMode("view");
            setEmployee(await readEmployee(employee.id as string));
        }
    }, [employee, mode, router, setMode, setEmployee]);

    const handleRemove = useCallback(async () => {
        if (!employee || !mode) return;
        if (employee.id) {
            const { toastText, redirectPath, success } = await remove(employee.id as string, text.employeePage.deleteSuccess);
            if (success) {
                toast.success(toastText as unknown as string);
            } else {
                toast.error(toastText as unknown as string);
            }
            if (redirectPath) {
                router.push(redirectPath);
            }
        }
    }, [employee, router, text, mode]);

    const controlButtons = useMemo(() => (
        <div className="flex justify-end gap-4 mx-2">
            {mode === "add" || mode === "edit" ? (
                <>
                    <Button color="secondary" onPress={() => handleCancelPress()}>
                        {text.employeePage.cancel}
                    </Button>
                    <Button color="primary" onPress={() => handleSavePress()}>
                        {text.employeePage.save}
                    </Button>
                </>
            ) : (
                <>
                    <Button 
                        color="danger" 
                        onPress={() => handleRemove()}
                    >
                        {text.employeePage.delete}
                    </Button>
                    <Button color="primary" onPress={() => setMode("edit")}>
                        {text.employeePage.edit}
                    </Button>
                </>
            )}
        </div>
    ), [handleCancelPress, handleRemove, handleSavePress, mode, text, setMode]);

    return (
        <>
            <h1 className="text-4xl font-bold text-center m-8">{title}</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 w-full container mx-auto">
                    <EmployeeInformations/>
                    <EmployeeQualifications/>
                    {controlButtons}
                </div>
            </div>
        </>
    );
}