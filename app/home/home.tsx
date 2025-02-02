"use client";

import { useText } from "@/app/context";
import { Link, Spacer } from "@heroui/react";
import Image from "next/image";
import logo from "@/app/logo.png";

export default function Home() {
    const text = useText();
    return (
        <>
            <h1 className="text-4xl font-bold text-center m-8">{text.home.home}</h1>
            <div className="flex justify-center mb-8">
                <Image src={logo} alt="Logo Azienda" width={200} height={200} className="rounded-full" />
            </div>
            <div className="container mx-auto px-4">
                <p className="text-lg">
                    Benvenuto nel sistema di gestione delle risorse umane della tua azienda. 
                </p>
                <p className="text-lg">
                    Questo sito ti permette di visualizzare, filtrare e gestire le risorse aziendali e le loro qualifiche in modo semplice ed efficace.
                </p>
                <Spacer y={8} />
                <section>
                    <h2 className="text-2xl font-semibold mb-2">Sezione Risorse</h2>
                    <p>
                        Nella sezione <Link href="/risorse"><strong>Risorse</strong></Link> troverai una tabella con tutte le risorse aziendali.
                        <ul className="list-disc list-inside">
                            <li>
                                Puoi cercare una risorsa specifica tramite la barra di ricerca.
                            </li>
                            <li>
                                Puoi filtrare le risorse in base al loro stato di assunzione.
                            </li>
                            <li>
                                Selezionando una riga della tabella, verrai reindirizzato alla pagina della risorsa selezionata.
                            </li>
                            <li>
                                Puoi aggiungere una nuova risorsa nel sistema.
                            </li>
                        </ul>
                    </p>
                </section>
                <Spacer y={8} />
                <section>
                    <h2 className="text-2xl font-semibold mb-2">Sezione Qualifiche</h2>
                    <p>
                        Nella sezione <Link href="/qualifiche"><strong>Qualifiche</strong></Link> troverai una tabella per ogni qualifica disponibile. 
                        <ul className="list-disc list-inside">
                            <li>
                                Puoi cliccare su una qualifica per visualizzare tutte le risorse con quella qualifica.
                            </li>
                            <li>
                                Puoi cercare una risorsa specifica tramite la barra di ricerca.
                            </li>
                            <li>
                                Puoi filtrare le risorse in base al loro stato di assunzione.
                            </li>
                            <li>
                                Selezionando una riga della tabella, verrai reindirizzato alla pagina della risorsa selezionata.
                            </li>

                        </ul>
                    </p>
                </section>
                <Spacer y={8} />
                <section>
                    <h2 className="text-2xl font-semibold mb-2">Pagina Dettaglio Risorsa</h2>
                    <p>
                        Nella pagina dettaglio della risorsa, puoi visualizzare tutte le informazioni ad essa associate. 
                        <ul className="list-disc list-inside">
                            <li>
                                Puoi visualizzare le informazioni, le qualifiche e i documenti della risorsa.
                            </li>
                            <li>
                                Puoi modificare le informazioni, le qualifiche e i documenti della risorsa.
                            </li>
                            <li>
                                Puoi eliminare la risorsa dal sistema.
                            </li>
                        </ul>
                    </p>
                </section>
            </div>
        </>
    );
}