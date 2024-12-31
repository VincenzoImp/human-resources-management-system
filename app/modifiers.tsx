"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context";
import Footer from "@/app/components/footer";

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
            <Footer />
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
