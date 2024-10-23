"use client";

import { Button } from "@nextui-org/react";
import { handleLogout } from "./authentication";
import { useEffect, useState } from "react";

function Dashboard() {

    const [user, setUser] = useState<any>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser);
        }
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome {user.email}</p>
            <Button onClick={() => handleLogout(setUser)} color="primary">
                Logout
            </Button>
        </div>
    );
}

export { Dashboard };