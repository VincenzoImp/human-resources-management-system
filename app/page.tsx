"use client";

import { useState, ChangeEvent } from "react";
import { Input, Button, Card, Tabs, Tab } from "@nextui-org/react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "./firebase/config";

export default function Home() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [activeKey, setActiveKey] = useState<string>("login");

    function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleLogin() {
        signInWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
            toast.success("Logged in successfully!");
        }).catch((error: any) => {
            toast.error(error.message);
        });
    }

    function handleRegister() {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
            toast.success("Registered successfully!");
        }).catch((error: any) => {
            toast.error(error.message);
        });
    }

    function handleLogout() {
        signOut(auth).then(() => {
            toast.success("Logged out successfully!");
        }).catch((error: any) => {
            toast.error(error.message);
        });
    }

    function dashboardComponent() {
        return (
            <div>
                <h2>Dashboard</h2>
                <p>Welcome {auth.currentUser ? auth.currentUser.email : "Guest"}</p>
                <Button onClick={handleLogout} color="primary">
                    Logout
                </Button>
            </div>
        );
    }

    function authComponent() {
        return (
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-center">Authentication</h1>
                <Card className="p-4 m-4 w-full">
                    <Tabs selectedKey={activeKey} onSelectionChange={(key) => setActiveKey(String(key))} className="justify-center pb-4">
                        <Tab key="login" title="Login" className="py-0">
                            <Input
                                className="mb-4"
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <Input
                                className="mb-4"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Button onClick={handleLogin} color="primary" className="w-full">
                                Login
                            </Button>
                        </Tab>
                        <Tab key="register" title="Register" className="py-0">
                            <Input
                                className="mb-4"
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <Input
                                className="mb-4"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Button onClick={handleRegister} color="primary" className="w-full">
                                Register
                            </Button>
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        );
    }

    function toasterComponent() {
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
    console.log(auth);

    return (
        <>  
            {toasterComponent()}
            {auth==null ? dashboardComponent() : authComponent()}
        </>
    );
}
