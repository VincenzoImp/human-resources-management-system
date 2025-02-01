"use client";

import { useCallback, useMemo, useState } from "react";
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import type { Employee } from "@/app/context";
import { useText } from "@/app/context";
import { createEmployee, modifyEmployee, deleteEmployee, readEmployee } from "@/app/api";
import { toast } from "@/app/components/toast";
import { useRouter } from "next/navigation";
import EmployeeInformations from "@/app/risorse/[id]/employeeInformations";
import { useEmployee, useMode } from "@/app/risorse/[id]/context";
import EmployeeQualifications from "@/app/risorse/[id]/employeeQualifications";
import EmployeeDocuments from "@/app/risorse/[id]/employeeDocuments";
import { usePermissions } from "@/app/context";

async function save(employee: Employee, mode: string, saveSuccessText: string) {
    let toastText: string | null = null;
    let redirectPath: string | null = null;
    let success: boolean = false;
    if (mode === "add") {
        try {
            const id = await createEmployee(employee);
            employee.id = id;
            toastText = saveSuccessText;
            redirectPath = `/risorse/${id}`;
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
            redirectPath = `/risorse/${id}`;
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
        redirectPath = "/risorse";
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
    const permissions = usePermissions();
    const { isOpen, onOpenChange } = useDisclosure();
    const [fromButtonType, setFromButtonType] = useState<"delete" | "add" | "edit" | null>(null);

    const checkRequiredFields = useCallback(() => {
        if (!employee || !mode) return false;
        const requiredKeys = ["name", "surname", "phone", "email", "gender", "taxCode", "employed"];
        for (const key of requiredKeys as (keyof Employee)[]) {
            if (!employee[key]) {
                toast.error(text.employeePage.fillRequiredFields);
                return false;
            }
        }
        return true;
    }, [employee, mode, text]);

    const handleSavePress = useCallback(async () => {
        if (!employee || !mode) return;
        const saveSuccessText = mode === "add" ? text.employeePage.addSuccess : text.employeePage.editSuccess;
        const { toastText, redirectPath, success } = await save(employee, mode, saveSuccessText);
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
    }, [employee, mode, router, setMode, setEmployee, text]);

    const handleCancelPress = useCallback(async () => {
        if (!employee || !mode) return;
        if (mode === "add") {
            router.push("/risorse");
        } else {
            setMode("view");
            setEmployee(await readEmployee(employee.id as string));
        }
    }, [employee, mode, router, setMode, setEmployee]);

    const handleRemovePress = useCallback(async () => {
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

    const confirmationModal = useMemo(() => {
        let title = "";
        let color: "danger" | "primary" | undefined;
        let value = "";
        switch (fromButtonType) {
            case "delete":
                title = text.employeePage.deleteConfirmation;
                color = "danger";
                value = text.employeePage.delete;
                break;
            case "add":
                title = text.employeePage.addConfirmation;
                color = "primary";
                value = text.employeePage.add;
                break;
            case "edit":
                title = text.employeePage.editConfirmation;
                color = "primary";
                value = text.employeePage.edit;
                break;
        }
        return (
            <Modal isOpen={isOpen} onOpenChange={ () => {onOpenChange(); setFromButtonType(null);} }>
                <ModalContent>
                    <ModalHeader>
                        {title}
                    </ModalHeader>
                    <ModalFooter>
                        <Button color="secondary" onPress={() => {onOpenChange(); setFromButtonType(null);}}>
                            {text.employeePage.cancel}
                        </Button>
                        <Button 
                            color={color}
                            onPress={() => {
                                if (fromButtonType === "delete") {
                                    handleRemovePress();
                                } else {
                                    handleSavePress();
                                }
                                onOpenChange();
                                setFromButtonType(null);
                            }}
                        >
                            {value}
                        </Button>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    }, [text, isOpen, onOpenChange, fromButtonType, handleRemovePress, handleSavePress]);

    const controlButtons = useMemo(() => (
        <div className="flex justify-end gap-4 mx-2">
            {mode === "add" || mode === "edit" ? (
                <>
                    <Button 
                        color="secondary" 
                        onPress={() => handleCancelPress()} 
                    >
                        {text.employeePage.cancel}
                    </Button>
                    <Button 
                        color="primary" 
                        onPress={() => { 
                            if (checkRequiredFields()){
                                setFromButtonType(mode); 
                                onOpenChange(); 
                            }
                        }}
                        isDisabled={!permissions || permissions.write === false}
                    >
                        {text.employeePage.save}
                    </Button>
                </>
            ) : (
                <>
                    <Button 
                        color="danger" 
                        onPress={() => { setFromButtonType("delete"); onOpenChange(); }}
                        isDisabled={!permissions || permissions.write === false}
                    >
                        {text.employeePage.delete}
                    </Button>
                    <Button 
                        color="primary" 
                        onPress={() => setMode("edit")}
                        isDisabled={!permissions || permissions.write === false}
                    >
                        {text.employeePage.edit}
                    </Button>
                </>
            )}
        </div>
    ), [handleCancelPress, mode, text, setMode, permissions, checkRequiredFields, onOpenChange]);

    return (
        <>
            <h1 className="text-4xl font-bold text-center m-8">{title}</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 w-full container mx-auto">
                    <EmployeeInformations/>
                    <EmployeeQualifications/>
                    <EmployeeDocuments/>
                    {controlButtons}
                </div>
            </div>
            {confirmationModal}
        </>
    );
}