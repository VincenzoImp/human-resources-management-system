"use client";

import { Authenticated } from "../modifiers";
import Navigation from "../components/navigation";
import Specializations from "./specializations";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="Specializations" />
            <Specializations />
        </Authenticated>
    );
}