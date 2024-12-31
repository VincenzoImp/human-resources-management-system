"use client";

import { Authenticated } from "@/app/modifiers";
import Navigation from "@/app/components/navigation";
import Qualifications from "@/app/qualifications/qualifications";

export default function Page() {
    return (
        <Authenticated>
            <Navigation itemActive="qualifications" />
            <Qualifications />
        </Authenticated>
    );
}