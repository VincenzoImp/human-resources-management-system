"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { ReactNode } from "react";

interface ContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
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
    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    );
}

function getUser() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { user, setUser } = context;
    return { user, setUser };
}

export { ContextProvider, getUser };