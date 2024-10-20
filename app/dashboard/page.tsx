"use client"

import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter();

    if (!auth.currentUser) {
        router.push("/login");
    } else {
        return (
            <div>
                <h2>Dashboard</h2>
                <p>Welcome {auth.currentUser.email}</p>
            </div>
        );
    }
    
}
