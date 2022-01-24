export namespace Stabilimento {

  export interface Stabilimento {

    cliente: number; // 0,
    data_creazione: string; // 2021-04-07T08:13:54,
    data_modifica: string; // 2021-06-21T08:26:30,
    descrizione: string; // Stabilimento balneare e ristorante in Forte dei Marmi. Innovazione, nel rispetto della tradizione: al bagno Alpemare gli ospiti vengono cullati dal comfort rigenerante della vacanza.,
    email: string; // info@alpemare.com,
    flag_ann: number; // 1,
    id: number; // 1,
    id_comune: number; // 4218,
    id_utente_ambassador: string; // 13c58a03-13ac-4d3a-951b-9dec73079103,
    id_utente_proprietario: string; // 9b46dabf-62e4-4f07-8e8a-e1c33219f455,
    id_valido: null,
    indirizzo: string; // Viale della Repubblica, 69, 55042 Forte dei Marmi LU,
    latitudine: number; // 43.9486708,
    link: string; // null,
    longitudine: number; // 10.1777478,
    nome: string; // ALPEMARE,
    note_record: string; // null,
    sito: string; // http://www.alpemare.com,
    telefono: string; // 0584 181 1042,
    telefono_wa: string; // null,
    visibile: 'S' | 'N'

  }

  export interface OmbrellonePOST {
    coord_y: number; // $event.offsetY - this.map.nativeElement.offsetTop + 15,
    coord_x: number; // $event.offsetX - 15,
    id_stabilimento: 1,
    ombrellone_tipi_id: 0,
    num_max_lettini_aggiuntivi: 0,
    numero_fila: 0,
    numero_lettini: 0,
    numero_riga: 0,
    id: 0,
    descrizione: '',
    data_creazione: '',
    data_modifica: '',
    flag_ann: 1,
    id_valido: 1,
    note_record: ''
  }

  export interface Ombrellone {
    coord_x: number; // null,
    coord_y: number; // null,
    data_creazione: string; // 2021-04-11T10:38:06,
    data_modifica: string; // 2021-04-11T10:38:06,
    descrizione: string; // Fila 1 - colonna 1,
    flag_ann: number; // 0,
    id?: number; // 49,
    id_stabilimento: number; // 4,
    id_valido: number; // null,
    note_record: string; // null,
    num_max_lettini_aggiuntivi: number; // 0,
    numero_fila: number; // 1,
    numero_lettini: number; // 2,
    numero_riga: number; // 1,
    ombrellone_tipi_id: number; // 0
    ombrellone_tipo?: {
      id: number; // 
      descrizione: string; //
      icona: string;
    }

  }


}