export interface OMUser {
    id: string;
    email: string;
    rolw: string;
    id_stato_utente: number; // 0
    stato_utente: {
        descrizione: string;
        flag_ann: number; // 0
        note_record: string;
        data_creazione: string; // 2021-12-20T14:42:23.425Z;
        data_modifica: string;// 2021-12-20T14:42:23.425Z
    };
    id_tipo_utente: number; // 0
    tipo_utente: {
        descrizione: string;
        flag_ann: number; // 0
        note_record: string;
        data_creazione: string;// 2021-12-20T14:42:23.425Z;
        data_modifica: string;// 2021-12-20T14:42:23.425Z
    };
    nome: string;
    cognome: string;
    sesso: string;
    cellulare: string;
    indirizzo: string;
    codice_fiscale: string;
    partita_iva: string;
    indirizzo_fatturazione: string;
    email_paypal: string;
    riceve_newsletter: string;
    riceve_mail_automatiche: string;
    loggato: string;
    codice_utente: number; // 0
    codice_utente_padre: string;
    resetKey: string;
    privacy: number; // 0
    terms: number; // 0
    flag_ann: number; // 0
    data_creazione: string;// 2021-12-20T14:42:23.425Z;
    data_modifica: string;// 2021-12-20T14:42:23.425Z
};