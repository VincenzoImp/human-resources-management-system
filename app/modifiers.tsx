"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context";

const Authenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push("/authentication");
        }
    }, [user, router]);
    if (!user) {
        return null;
    }
    return (
        <>
            {children}
        </>
    );
};

const Unauthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    if (user) {
        return null;
    }
    return (
        <>
            {children}
        </>
    );
};

export { Authenticated, Unauthenticated };
