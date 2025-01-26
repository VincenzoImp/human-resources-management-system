"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { readPermissions } from "@/app/api";
import toast from "react-hot-toast";

interface Employee {
    birthdate: string | null;
    birthplaceCity: string | null;
    birthplaceNation: string | null;
    birthplaceProvincia: string | null;
    birthplaceZipcode: number | null;
    documents: Array<string> | null;
    email: string | null;
    employed: "Yes" | "No" | null;
    gender: string | null;
    id?: string | null;
    livingplaceAddress: string | null;
    livingplaceCity: string | null;
    livingplaceNation: string | null;
    livingplaceProvincia: string | null;
    livingplaceZipcode: number | null;
    name: string | null;
    notes: string | null;
    phone: string | null;
    qualifications: Record<string, Array<Record<string, string | number>>> | null;
    surname: string | null;
    taxCode: string | null;
}

interface ContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    permissions: {
        write: boolean;
    } | null;
    text: Record<string, Record<string, string>>;
    attributesQualifications: Record<string, string[]>;
}

const Context = React.createContext<ContextType | null>(null);

const ContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {

    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            try {
                return user ? JSON.parse(user) : null;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
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

    const [permissions, setPermissions] = useState<{ write: boolean } | null>(null);
    useEffect(() => {
        const fetchPermissions = async () => {
            if (permissions === null && user) {
                try {
                    const userPermissions = await readPermissions(user.uid);
                    setPermissions(userPermissions);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        toast.error(error.message);
                    }
                    setPermissions({
                        write: false
                    });
                }
            }
        }
        fetchPermissions();
    }, [permissions, user]);

    const text = {
        authentication: {
            toggleMenu: "Menu Navigazione",
            accountMenu: "Menu Account",
            avatar: "Avatar",
            profile: "Profilo",
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
            employees: "Risorse",
        },
        employeesTable: {
            searchPlaceholder: "Cerca per tutti i campi",
            filter: "Filtra",
            addNew: "Aggiungi",
            rowsPerPage: "Risorse per pagina",
            totalEmployees: "Totale Risorse",
        },
        employeePage: {
            edit: "Modifica",
            save: "Salva",
            delete: "Elimina",
            cancel: "Annulla",       
            addTitle: "Aggiungi Risorsa",
            editTitle: "Modifica Risorsa",
            viewTitle: "Dettagli Risorsa",
            addSuccess: "Risorsa aggiunta con successo!",
            editSuccess: "Risorsa modificata con successo!",
            deleteSuccess: "Risorsa eliminata con successo!",
            fillRequiredFields: "Compila i campi obbligatori",
        },
        employeeInformations: {
            personalInformations: "Informazioni Personali",
            birthInformations: "Informazioni di Nascita",
            livingInformations: "Informazioni di Residenza",
            notesInformations: "Note",
        },
        employeeQualifications: {
            qualifications: "Qualifiche",
            qualification: "Qualifica",
            score: "Giudizio",
            actions: "Azioni",
            technique: "Tecnica",
            material: "Materiale",
            editQualification: "Modifica Qualifica",
            addQualification: "Aggiungi Qualifica",
            next: "Avanti",
            back: "Indietro",
            cancel: "Annulla",
            add: "Aggiungi",
            save: "Salva",
            selectQualification: "Seleziona una Qualifica",
            noQualifications: "Nessuna Qualifica",
        },
        employeeDocuments: {
            documents: "Documenti",
            document: "Documento",
            noDocuments: "Nessun Documento",
            addDocument: "Aggiungi Documento",
            actions: "Azioni",
            cancel: "Annulla",
            add: "Aggiungi",
        },
        qualifications: {
            qualifications: "Qualifiche",
        },
        qualificationsTable: {
            name: "Nome",
            surname: "Cognome",
            employed: "Assunto",
            score: "Giudizio",
            searchPlaceholder: "Cerca per tutti i campi",
            filter: "Filtra",
            totalQualifications: "Totale Qualifiche",
            rowsPerPage: "Qualifiche per pagina",
            qualification: "Qualifica",
            technique: "Tecnica",
            material: "Materiale",
        },
        navigation: {
            home: "Home",
            employees: "Risorse",
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
            birthplaceCity: "Città di Nascita",
            birthplaceNation: "Nazione di Nascita",
            birthplaceProvincia: "Provincia di Nascita",
            birthplaceZipcode: "CAP di Nascita",
            documents: "Documenti",
            email: "Email",
            employed: "Assunto",
            gender: "Genere",
            id: "ID",
            livingplaceAddress: "Indirizzo di Residenza",
            livingplaceCity: "Città di Residenza",
            livingplaceNation: "Nazione di Residenza",
            livingplaceProvincia: "Provincia di Residenza",
            livingplaceZipcode: "CAP di Residenza",
            name: "Nome",
            notes: "Note",
            phone: "Telefono",
            qualifications: "Qualifiche",
            surname: "Cognome",
            taxCode: "Codice Fiscale",
        },
        qualificationsList: {
            tubista: "Tubista",
            saldatore: "Saldatore",
            carpentiere: "Carpentiere",
            impiegato: "Impiegato",
            capoTecnico: "Capo Tecnico",
            manovale: "Manovale",
            aiutante: "Aiutante",
            accoppiatorista: "Accoppiatorista",
            montatore: "Montatore",
        }
    }

    const attributesQualifications = {
        ["score"]: ["tubista", "carpentiere", "impiegato", "capoTecnico", "manovale", "aiutante", "accoppiatorista", "montatore"],
        ["technique_material_score"]: ["saldatore"]
    };

    return (
        <Context.Provider value={{ user, setUser, permissions, text, attributesQualifications }}>
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

function usePermissions() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { permissions } = context;
    return permissions;
}

function useText() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { text } = context;
    return text;
}

function useAttributesQualifications() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { attributesQualifications } = context;
    return attributesQualifications;
}

export { ContextProvider, useUser, usePermissions, useText, useAttributesQualifications };
export type { Employee };
