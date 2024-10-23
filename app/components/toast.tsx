"use client";

import toast, { Toaster } from "react-hot-toast";

function Toast() {
    return (
        <Toaster
            toastOptions={{
                success: {
                    style: {
                        background: "#22c55e",
                        color: "#fff",
                    }
                },
                error: {
                    style: {
                        background: "#ef4444",
                        color: "#fff",
                    }
                }
            }}
        />
    );
}

export { toast, Toast };