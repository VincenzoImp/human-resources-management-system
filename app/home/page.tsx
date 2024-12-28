"use client";

import { Authenticated } from "../modifiers";
import Navigation from "../components/navigation";
import Home from "./home";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="home" />
            <Home />
        </Authenticated>
    );
}