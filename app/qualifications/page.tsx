"use client";

import { Authenticated } from "../modifiers";
import Navigation from "../components/navigation";
import Qualifications from "./qualifications";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="qualifications" />
            <Qualifications />
        </Authenticated>
    );
}