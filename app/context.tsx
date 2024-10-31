"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { ReactNode } from "react";
import { User } from "firebase/auth";
import { getEmployees } from "./api";

interface Employee {
    birthdate: Date;
    birthplace: string;
    birthplace_nation: string;
    birthplace_provincia: string;
    email: string;
    gender: string;
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
    employees: Map<string, Employee> | null;
    setEmployees: React.Dispatch<React.SetStateAction<Map<string, Employee> | null>>;
}

const Context = React.createContext<ContextType | null>(null);

const ContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        }
    });
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const [employees, setEmployees] = useState<Map<string, Employee> | null>(null);
    useEffect(() => {
        if (!employees) {
            getEmployees().then((newEmployees) => {
                return setEmployees(newEmployees);
            });
        }
    }, [employees]);

    return (
        <Context.Provider value={{ user, setUser, employees, setEmployees }}>
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
    const { employees, setEmployees } = context;
    return { employees, setEmployees };
}

export { ContextProvider, useUser, useEmployees };
export type { Employee };
