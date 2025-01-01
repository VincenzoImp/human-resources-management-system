"use client";

import Navigation from "@/app/components/navigation";
import Qualifications from "@/app/qualifications/qualifications";
import Footer from "@/app/components/footer";

export default function Page() {
    return (
        <>
            <Navigation itemActive="qualifications" />
            <Qualifications />
            <Footer/>
        </>
    );
}