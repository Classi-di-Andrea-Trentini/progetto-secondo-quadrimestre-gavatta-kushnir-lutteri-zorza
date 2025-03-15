
export class GiocoVenduto {
    uid: string;
    uid_gioco: string;
    prezzo: number;
    detaVendita: Date;

    constructor(uid: string, uid_gioco: string, prezzo: number, dataVendita: Date) {
        this.uid = uid;
        this.uid_gioco = uid_gioco;
        this.prezzo = prezzo;
        this.detaVendita = dataVendita;    
    }
    
}