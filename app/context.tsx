"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { pullEmployees } from "./api";

interface Employee {
    birthdate: Date;
    birthplace: string;
    birthplace_nation: string;
    birthplace_provincia: string;
    document: string;
    email: string;
    employed: boolean;
    gender: string;
    id?: string;
    livingplace_address: string;
    livingplace_nation: string;
    livingplace_provincia: string;
    livingplace_zipcode: number;
    n_mat: number;
    n_pro: number;
    name: string;
    phone: string;
    surname: string;
    tax_code: string;
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
            pullEmployees().then((data: Array<Employee>) => {
                setEmployees(data);
            });
        }
    }, [employees]);

    const employeeColumns = [
        { field: "birthdate", headerName: "Birthdate"},
        { field: "birthplace", headerName: "Birthplace"},
        { field: "birthplace_nation", headerName: "Birthplace Nation"},
        { field: "birthplace_provincia", headerName: "Birthplace Provincia"},
        { field: "document", headerName: "Document"},
        { field: "email", headerName: "Email"},
        { field: "employed", headerName: "Employed"},
        { field: "gender", headerName: "Gender"},
        { field: "id", headerName: ""},
        { field: "livingplace_address", headerName: "Livingplace Address"},
        { field: "livingplace_nation", headerName: "Livingplace Nation"},
        { field: "livingplace_provincia", headerName: "Livingplace Provincia"},
        { field: "livingplace_zipcode", headerName: "Livingplace Zipcode"},
        { field: "n_mat", headerName: "N Mat"},
        { field: "n_pro", headerName: "N Pro"},
        { field: "name", headerName: "Name"},
        { field: "phone", headerName: "Phone"},
        { field: "surname", headerName: "Surname"},
        { field: "tax_code", headerName: "Tax Code"}
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
