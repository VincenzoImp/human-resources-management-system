"use client";

import { ContextProvider } from "@/app/employees/[id]/context";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ContextProvider>
            {children}
        </ContextProvider> 
    );
}