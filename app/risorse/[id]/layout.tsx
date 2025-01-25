"use client";

import { ContextProvider } from "@/app/risorse/[id]/context";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ContextProvider>
            {children}
        </ContextProvider> 
    );
}