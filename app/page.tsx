"use client"

import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    if (auth.currentUser) {
        router.push("/dashboard");
    } else {
        router.push("/login");
    }
}