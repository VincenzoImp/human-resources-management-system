"use client";

import { useEffect, useCallback, use } from "react";
import type { Employee } from "@/app/context";
import EmployeePage from "@/app/employees/[id]/employeePage";
import { notFound } from "next/navigation";
import Navigation from "@/app/components/navigation";
import { readEmployee } from "@/app/api";
import { toast } from "@/app/components/toast";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import Footer from "@/app/components/footer";

type EmployeePageProps = {
    params: Promise<{id: string}>;
};

const emptyEmployee: Employee = {
    birthdate: null,
    birthplaceCity: null,
    birthplaceNation: null,
    birthplaceProvincia: null,
    birthplaceZipcode: null,
    documents: null,
    email: null,
    employed: null,
    gender: null,
    livingplaceAddress: null,
    livingplaceCity: null,
    livingplaceNation: null,
    livingplaceProvincia: null,
    livingplaceZipcode: null,
    name: null,
    phone: null,
    surname: null,
    taxCode: null,
    qualifications: {},
};

export default function Page({ params }: EmployeePageProps) {
    const { id: employeeId } = use(params);
    const { mode, setMode } = useMode();
    const { employee, setEmployee } = useEmployee();

    const fetchMode = useCallback(() => {
        if (mode === undefined) {
            setMode(employeeId === "add-new" ? "add" : "view");
        }
    }, [mode, employeeId, setMode]);

    const fetchEmployee = useCallback(async () => {
        if (employee === undefined) {
            if (employeeId === "add-new") {
                setEmployee(emptyEmployee);
            } else {
                try {
                    const employee = await readEmployee(employeeId);
                    setEmployee(employee);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        toast.error(error.message);
                    }
                }
            }
        }
    }, [employee, employeeId, setEmployee]);

    useEffect(() => {
        fetchMode();
        fetchEmployee();
    }, [fetchMode, fetchEmployee]);

    if (employee === undefined) {
        return null;
    }
    if (employee === null) {
        return notFound();
    }

    return (

        <>
            <Navigation itemActive="employees" />
            <EmployeePage />
            <Footer />
        </>
    );
}
