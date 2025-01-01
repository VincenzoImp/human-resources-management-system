"use client";

import Navigation from "@/app/components/navigation";
import Home from "@/app/home/home";
import Footer from "@/app/components/footer";

export default function Page() {
    return (
        <>
            <Navigation itemActive="home" />
            <Home />
            <Footer/>
        </>
    );
}