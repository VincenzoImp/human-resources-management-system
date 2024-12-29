"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { readEmployees } from "./api";

interface Employee {
    birthdate: string | null;
    birthplace_city: string | null;
    birthplace_nation: string | null;
    birthplace_provincia: string | null;
    birthplace_zipcode: number | null;
    documents: string | null;
    email: string | null;
    employed: "Yes" | "No" | null;
    gender: string | null;
    id?: string | null;
    livingplace_address: string | null;
    livingplace_city: string | null;
    livingplace_nation: string | null;
    livingplace_provincia: string | null;
    livingplace_zipcode: number | null;
    // n_mat: number | null;
    // n_pro: number | null;
    name: string | null;
    phone: string | null;
    surname: string | null;
    tax_code: string | null;
    qualifications: Record<string, Record<string, string>>
}

interface ContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    employees: Array<Employee> | null;
    text: Record<string, Record<string, string>>;
}

const Context = React.createContext<ContextType | null>(null);

const ContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {

    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            try {
                return user ? JSON.parse(user) : null;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    });
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const [employees, setEmployees] = useState<Array<Employee> | null>(null);
    useEffect(() => {
        if (!employees) {
            readEmployees().then((data: Array<Employee>) => {
                setEmployees(data);
            });
        }
    }, [employees]);

    const text = {
        authentication: {
            authentication: "Autenticazione",
            loginSuccess: "Accesso effettuato con successo!",
            registrationSuccess: "Registrazione effettuata con successo!",
            logoutSuccess: "Disconnessione effettuata con successo!",
            login: "Accesso",
            register: "Registrazione",
            email: "Email",
            emailPlaceholder: "Inserisci la tua email",
            password: "Password",
            passwordPlaceholder: "Inserisci la tua password",
            loginButton: "Accedi",
            registerButton: "Registrati",
            emailError: "Inserisci un'email valida",
            passwordError: "La password deve contenere almeno 6 caratteri",
            logoutButton: "Disconnetti",
            loggedInAs: "Accesso come",
        },
        home: {
            home: "Home"
        },
        employees: {
            employees: "Dipendenti",
        },
        employeesTable: {
            searchPlaceholder: "Cerca per nome o cognome",
            filter: "Filtra",
            addNew: "Aggiungi",
            rowsPerPage: "Righe per pagina",
            totalEmployees: "Totale dipendenti",
        },
        employeePage: {
            personalInformations: "Informazioni Personali",
            birthInformations: "Informazioni di Nascita",
            livingInformations: "Informazioni di Residenza",
            qualifications: "Qualifiche",
            documents: "Documenti",
            edit: "Modifica",
            save: "Salva",
            delete: "Elimina",
            cancel: "Annulla",            
            addTitle: "Aggiungi Dipendente",
            editTitle: "Modifica Dipendente",
            viewTitle: "Dettagli Dipendente",
            addSuccess: "Dipendente aggiunto con successo!",
            editSuccess: "Dipendente modificato con successo!",
            deleteSuccess: "Dipendente eliminato con successo!",
            fillRequiredFields: "Compila i campi obbligatori",
        },
        qualifications: {
            qualifications: "Qualifiche"
        },
        navigation: {
            home: "Home",
            employees: "Dipendenti",
            qualifications: "Qualifiche"
        },
        other: {
            iwn: "IWN",
            yes: "Sì",
            no: "No",
            employeds: "Assunti",
            unemployeds: "Non Assunti",
            all: "Tutti",
            male: "Maschio",
            female: "Femmina",
            other: "Altro"
        },
        employeeAttributes: {
            birthdate: "Data di Nascita",
            birthplace_city: "Città di Nascita",
            birthplace_nation: "Nazione di Nascita",
            birthplace_provincia: "Provincia di Nascita",
            birthplace_zipcode: "CAP di Nascita",
            documents: "Documenti",
            email: "Email",
            employed: "Assunto",
            gender: "Genere",
            id: "ID",
            livingplace_address: "Indirizzo di Residenza",
            livingplace_city: "Città di Residenza",
            livingplace_nation: "Nazione di Residenza",
            livingplace_provincia: "Provincia di Residenza",
            livingplace_zipcode: "CAP di Residenza",
            // n_mat: "N Mat",
            // n_pro: "N Pro",
            name: "Nome",
            phone: "Telefono",
            surname: "Cognome",
            tax_code: "Codice Fiscale",
            qualifications: "Qualifiche"
        },
        qualificationsList: {
            tubista: "Tubista",
            saldatore: "Saldatore",
            carpentiere: "Carpentiere",
            impiegato: "Impiegato",
            capo_tecnico: "Capo Tecnico",
            manovale: "Manovale"
        },
    }

    return (
        <Context.Provider value={{ user, setUser, employees, text }}>
            {children}
        </Context.Provider>
    );
}

function useUser() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { user, setUser } = context;
    return { user, setUser };
}

function useEmployees() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { employees } = context;
    return employees;
}

function useText() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { text } = context;
    return text;
}

export { ContextProvider, useUser, useEmployees, useText };
export type { Employee };
