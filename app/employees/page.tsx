"use client";

import { Authenticated } from "../modifiers";
import Navigation from "../components/navigation";
import Employees from "../components/employees";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="Employees" />
            <Employees />
        </Authenticated>
    );
}