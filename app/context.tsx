"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { readEmployees } from "./api";

interface Employee {
    birthdate: string | null;
    birthplace_city: string | null;
    birthplace_nation: string | null;
    birthplace_provincia: string | null;
    birthplace_zipcode: number | null;
    document: string | null;
    email: string | null;
    employed: "True" | "False" | null;
    gender: string | null;
    id?: string | null;
    livingplace_address: string | null;
    livingplace_city: string | null;
    livingplace_nation: string | null;
    livingplace_provincia: string | null;
    livingplace_zipcode: number | null;
    // n_mat: number | null;
    // n_pro: number | null;
    name: string | null;
    phone: string | null;
    surname: string | null;
    tax_code: string | null;
    qualifications: Record<string, Record<string, string>>
}

interface ContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    employees: Array<Employee> | null;
    employeeColumns: { field: string, headerName: string }[];
}

const Context = React.createContext<ContextType | null>(null);

const ContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {

    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            try {
                return user ? JSON.parse(user) : null;
            } catch (error) {
                console.error(error);
                return null;
            }            
        }
    });
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const [employees, setEmployees] = useState<Array<Employee> | null>(null);
    useEffect(() => {
        if (!employees) {
            readEmployees().then((data: Array<Employee>) => {
                setEmployees(data);
            });
        }
    }, [employees]);

    const employeeColumns = [
        { field: "birthdate", headerName: "Birthdate"},
        { field: "birthplace_city", headerName: "Birthplace City"},
        { field: "birthplace_nation", headerName: "Birthplace Nation"},
        { field: "birthplace_provincia", headerName: "Birthplace Provincia"},
        { field: "birthplace_zipcode", headerName: "Birthplace Zipcode"},
        { field: "document", headerName: "Document"},
        { field: "email", headerName: "Email"},
        { field: "employed", headerName: "Employed"},
        { field: "gender", headerName: "Gender"},
        { field: "id", headerName: "ID"},
        { field: "livingplace_address", headerName: "Livingplace Address"},
        { field: "livingplace_city", headerName: "Livingplace City"},
        { field: "livingplace_nation", headerName: "Livingplace Nation"},
        { field: "livingplace_provincia", headerName: "Livingplace Provincia"},
        { field: "livingplace_zipcode", headerName: "Livingplace Zipcode"},
        // { field: "n_mat", headerName: "N Mat"},
        // { field: "n_pro", headerName: "N Pro"},
        { field: "name", headerName: "Name"},
        { field: "phone", headerName: "Phone"},
        { field: "surname", headerName: "Surname"},
        { field: "tax_code", headerName: "Tax Code"},
        { field: "qualifications", headerName: "Qualifications"}
    ]
    
    return (
        <Context.Provider value={{ user, setUser, employees, employeeColumns }}>
            {children}
        </Context.Provider>
    );
}

function useUser() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { user, setUser } = context;
    return { user, setUser };
}

function useEmployees() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { employees } = context;
    return employees;
}

function useEmployeeColumns() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { employeeColumns } = context;
    return employeeColumns;
}

export { ContextProvider, useUser, useEmployees, useEmployeeColumns };
export type { Employee };
