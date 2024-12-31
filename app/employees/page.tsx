"use client";

import { Authenticated } from "@/app/modifiers";
import Navigation from "@/app/components/navigation";
import Employees from "@/app/employees/employees";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="employees" />
            <Employees />
        </Authenticated>
    );
}