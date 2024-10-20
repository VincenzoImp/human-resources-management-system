"use client"

import { useState, ChangeEvent } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

export default function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            setError(error.message);
        }
    };

    if (auth.currentUser) {
        router.push("/dashboard");
    } else {
        return (
            <div>
                {/* TODO: error popup */}
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <Card className="p-4">
                    <Input className="mb-4"
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <Input className="mb-4"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button onClick={handleLogin}>
                        Login
                    </Button>
                </Card>
            </div>
        );
    }

};