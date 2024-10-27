"use client";

import { Dashboard } from "./components/dashboard";
import { Authentication } from "./components/authentication";
import { Toast } from "./components/toast";
import Navigation from "./components/navigation";
import { useUser } from "./context";

export default function Page() {
    const { user } = useUser();
    return (
        <>
            <Toast />
            { user ? 
                <>
                    <Navigation />
                    <Dashboard />
                </>
            :
                <Authentication />
            }
        </>
    );
}