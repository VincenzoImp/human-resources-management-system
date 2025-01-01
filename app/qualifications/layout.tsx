"use client";

import { Authenticated } from "@/app/modifiers";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Authenticated>
            {children}
        </Authenticated> 
    );
}