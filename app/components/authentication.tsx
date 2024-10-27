"use client";

import { useState, ChangeEvent } from "react";
import { Input, Button, Card, Tabs, Tab } from "@nextui-org/react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "./toast";
import { getUser } from "../context";

function handleEmailChange(e: ChangeEvent<HTMLInputElement>, setEmail: any) {
    setEmail(e.target.value);
}

function handlePasswordChange(e: ChangeEvent<HTMLInputElement>, setPassword: any) {
    setPassword(e.target.value);
}

function handleLogin(email: string, password: string, setEmail: any, setPassword: any, setUser: any) {
    signInWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
        setUser(userCredential.user);
        toast.success("Logged in successfully!");
    }).catch((error: any) => {
        toast.error(error.message);
    });
    setEmail("");
    setPassword("");
}

function handleRegister(email: string, password: string, setEmail: any, setPassword: any) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
        toast.success("Registered successfully!");
    }).catch((error: any) => {
        toast.error(error.message);
    });
    setEmail("");
    setPassword("");
}

function handleLogout(setUser: any) {
    signOut(auth).then(() => {
        setUser(null);
        toast.success("Logged out successfully!");
    }).catch((error: any) => {
        toast.error(error.message);
    });
}

function Authentication() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [activeKey, setActiveKey] = useState<string>("login");
    const { user, setUser } = getUser();
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
                            onChange={(e) => handleEmailChange(e, setEmail)}
                        />
                        <Input
                            className="mb-4"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e, setPassword)}
                        />
                        <Button onClick={() => handleLogin(email, password, setEmail, setPassword, setUser)} color="primary" className="w-full">
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
                            onChange={(e) => handleEmailChange(e, setEmail)}
                        />
                        <Input
                            className="mb-4"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e, setPassword)}
                        />
                        <Button onClick={() => handleRegister(email, password, setEmail, setPassword)} color="primary" className="w-full">
                            Register
                        </Button>
                    </Tab>
                </Tabs>
            </Card>
        </div>
    );
}

export { Authentication, handleLogout };