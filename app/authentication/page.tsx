"use client";

import { Unauthenticated } from "@/app/modifiers";
import { Authentication } from "@/app/authentication/authentication";

export default function Page() {
    return (
        <Unauthenticated>
            <Authentication />
        </Unauthenticated>
    );
}