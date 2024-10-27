"use client";

import { Authenticated } from "./modifiers";
import Navigation from "./components/navigation";
import Home from "./components/home";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="Home" />
            <Home />
        </Authenticated>
    );
}