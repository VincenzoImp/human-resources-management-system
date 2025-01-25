"use client";

import Navigation from "@/app/components/navigation";
import Qualifications from "@/app/qualifiche/qualifications";
import Footer from "@/app/components/footer";

export default function Page() {
    return (
        <>
            <Navigation itemActive="qualifiche" />
            <Qualifications />
            <Footer/>
        </>
    );
}