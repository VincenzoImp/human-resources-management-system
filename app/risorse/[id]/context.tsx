"use client";

import { useState, ReactNode } from "react";
import type { Employee } from "@/app/context";
import React from "react";

interface ContextType {
    mode: "add" | "edit" | "view" | undefined;
    setMode: React.Dispatch<React.SetStateAction<"add" | "edit" | "view" | undefined>>;
	employee: Employee | null | undefined;
	setEmployee: React.Dispatch<React.SetStateAction<Employee | null | undefined>>;
}

const Context = React.createContext<ContextType | null>(null);

const ContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
	
    const [mode, setMode] = useState<"add" | "edit" | "view" | undefined>(undefined);
    const [employee, setEmployee] = useState<Employee | null | undefined>(undefined);

    return (
        <Context.Provider value={{ mode, setMode, employee, setEmployee }}>
            {children}
        </Context.Provider>
    );
}

function useMode() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { mode, setMode } = context;
    return { mode, setMode };
}

function useEmployee() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { employee, setEmployee } = context;
    return { employee, setEmployee };
}

export { ContextProvider, useMode, useEmployee };