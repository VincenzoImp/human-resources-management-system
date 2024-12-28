"use client";

import { Authenticated } from "../modifiers";
import Navigation from "../components/navigation";
import Employees from "./employees";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="employees" />
            <Employees />
        </Authenticated>
    );
}