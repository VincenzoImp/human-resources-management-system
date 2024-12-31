"use client";

import { Authenticated } from "@/app/modifiers";
import Navigation from "@/app/components/navigation";
import Home from "@/app/home/home";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="home" />
            <Home />
        </Authenticated>
    );
}