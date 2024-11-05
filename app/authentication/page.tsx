"use client";

import { Unauthenticated } from "../modifiers";
import { Authentication } from "./authentication";

export default function Page() {
    return (
        <Unauthenticated>
            <Authentication />
        </Unauthenticated>
    );
}