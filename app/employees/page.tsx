"use client";

import Navigation from "@/app/components/navigation";
import Employees from "@/app/employees/employees";
import Footer from "@/app/components/footer";

export default function Page() {
    return (
        <>
            <Navigation itemActive="employees" />
            <Employees />
            <Footer/>
        </>
    );
}