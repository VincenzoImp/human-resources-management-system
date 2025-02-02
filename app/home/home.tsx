"use client";

import { useText } from "@/app/context";
import { Link, Spacer } from "@heroui/react";
import Image from 'next/image';

export default function Home() {
    const text = useText();
    return (
        <>
            <h1 className="text-4xl font-bold text-center m-8">{text.home.home}</h1>
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <Image src="/logo.png" alt="Logo Azienda" width={200} height={200} />
                </div>
                <p className="text-lg mb-4">
                    Benvenuto nel sistema di gestione delle risorse umane della tua azienda. 
                    Questo sito ti permette di visualizzare, filtrare e gestire le risorse aziendali
                    e le loro qualifiche in modo semplice ed efficace.
                </p>
                <Spacer y={8} />
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Sezione Risorse</h2>
                    <p>
                        Nella sezione <Link href="/risorse"><strong>Risorse</strong></Link> troverai una tabella con tutte le risorse aziendali.
                        <Spacer y={2} />
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
                                {`Puoi aggiungere nuove risorse tramite l'apposito pulsante.`}
                            </li>
                        </ul>
                    </p>
                </section>
                
                <section className="mb-6">
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
                
                <section>
                    <h2 className="text-2xl font-semibold mb-2">Pagina Dettaglio Risorsa</h2>
                    <p>
                        Nella pagina dettaglio della risorsa, puoi visualizzare tutte le informazioni ad essa associate. 
                        Inoltre, hai la possibilità di modificare i dati della risorsa o eliminarla dal sistema.
                    </p>
                </section>
            </div>
        </>
    );
}