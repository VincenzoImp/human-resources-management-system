"use client";

import { useText } from "@/app/context";

export default function Qualifications() {
    const text = useText();
    return (
        <h1 className="text-4xl font-bold text-center m-8">{text.qualifications.qualifications}</h1>
    );
}