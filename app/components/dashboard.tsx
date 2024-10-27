"use client";

import { Button } from "@nextui-org/react";
import { handleLogout } from "./authentication";
import { useUser } from "../context";

function Dashboard() {

    const { user, setUser } = useUser();

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome {user?.email}</p>
            <Button onClick={() => handleLogout(setUser)} color="primary">
                Logout
            </Button>
        </div>
    );
}

export { Dashboard };