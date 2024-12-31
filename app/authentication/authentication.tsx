"use client";

import { useState, ChangeEvent } from "react";
import { Input, Button, Card, Tabs, Tab } from "@nextui-org/react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential, User } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { toast } from "@/app/components/toast";
import { useText, useUser } from "@/app/context";

function handleEmailChange(
    e: ChangeEvent<HTMLInputElement>, 
    setEmail: (value: string) => void
) {
    setEmail(e.target.value);
}

function handlePasswordChange(
    e: ChangeEvent<HTMLInputElement>, 
    setPassword: (value: string) => void
) {
    setPassword(e.target.value);
}

function handleLogin(
    email: string, 
    password: string,
    loginSuccessText: string,
    emailErrorText: string,
    passwordErrorText: string,
    setEmail: (value: string) => void, 
    setPassword: (value: string) => void, 
    setUser: (user: User | null) => void
) {
    if (!email.includes("@") || !email.includes(".")) {
        toast.error(emailErrorText);
    } else if (password.length < 6) {
        toast.error(passwordErrorText);
    } else {
        signInWithEmailAndPassword(auth, email, password).then((userCredential: UserCredential) => {
            setUser(userCredential.user);
            toast.success(loginSuccessText);
        }).catch((error: Error) => {
            toast.error(error.message);
        });
    }
    setEmail("");
    setPassword("");
}

function handleRegister(
    email: string, 
    password: string, 
    registrationSuccessText: string,
    emailErrorText: string,
    passwordErrorText: string,
    setEmail: (value: string) => void, 
    setPassword: (value: string) => void
) {
    if (!email.includes("@") || !email.includes(".")) {
        toast.error(emailErrorText);
    } else if (password.length < 6) {
        toast.error(passwordErrorText);
    } else {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            toast.success(registrationSuccessText);
        }).catch((error: Error) => {
            toast.error(error.message);
        });
    }
    setEmail("");
    setPassword("");
}

function handleLogout(
    logoutSuccessText: string,
    setUser: (user: User | null) => void
) {
    signOut(auth).then(() => {
        setUser(null);
        toast.success(logoutSuccessText);
    }).catch((error: Error) => {
        toast.error(error.message);
    });
}

function Authentication() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [activeKey, setActiveKey] = useState<string>("login");
    const { setUser } = useUser();
    const text = useText();
    return (
        <div className="justify-center items-center flex h-screen w-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-center">{text.authentication.authentication}</h1>
                <Card className="p-4 m-4 w-full">
                    <Tabs selectedKey={activeKey} onSelectionChange={(key) => setActiveKey(String(key))} className="justify-center pb-4">
                        <Tab key="login" title={text.authentication.login} className="py-0">
                            <Input
                                className="mb-4"
                                label={text.authentication.email}
                                placeholder={text.authentication.emailPlaceholder}
                                type="email"
                                value={email}
                                onChange={(e) => handleEmailChange(e, setEmail)}
                                isRequired
                            />
                            <Input
                                className="mb-4"
                                label={text.authentication.password}
                                placeholder={text.authentication.passwordPlaceholder}
                                type="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e, setPassword)}
                                isRequired
                            />
                            <Button onClick={() => handleLogin(email, password, text.authentication.loginSuccess, text.authentication.emailError, text.authentication.passwordError, setEmail, setPassword, setUser)} color="primary" className="w-full">
                                {text.authentication.loginButton}
                            </Button>
                        </Tab>
                        <Tab key="register" title={text.authentication.register} className="py-0">
                            <Input
                                className="mb-4"
                                label={text.authentication.email}
                                placeholder={text.authentication.emailPlaceholder}
                                type="email"
                                value={email}
                                onChange={(e) => handleEmailChange(e, setEmail)}
                                isRequired
                            />
                            <Input
                                className="mb-4"
                                label={text.authentication.password}
                                placeholder={text.authentication.passwordPlaceholder}
                                type="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e, setPassword)}
                                isRequired
                            />
                            <Button onClick={() => handleRegister(email, password, text.authentication.registrationSuccess, text.authentication.emailError, text.authentication.passwordError, setEmail, setPassword)} color="primary" className="w-full">
                                {text.authentication.registerButton}
                            </Button>
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
}

export { Authentication, handleLogout };