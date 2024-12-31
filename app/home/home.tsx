"use client";

import { useText } from "@/app/context";

export default function Home() {
    const text = useText();
    return (
        <h1 className="text-4xl font-bold text-center m-8">{text.home.home}</h1>
    );
}