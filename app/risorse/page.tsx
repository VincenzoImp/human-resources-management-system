"use client";

import Navigation from "@/app/components/navigation";
import Employees from "@/app/risorse/employees";
import Footer from "@/app/components/footer";

export default function Page() {
    return (
        <>
            <Navigation itemActive="risorse" />
            <Employees />
            <Footer/>
        </>
    );
}