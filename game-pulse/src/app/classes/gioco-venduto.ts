import { DocumentReference } from "firebase/firestore";

export class GiocoVenduto {
    uid: string;
    prezzo: number;
    author: DocumentReference;
    valuta: string = "€";
    constructor(uid: string,  prezzo: number, author: DocumentReference) {
        this.uid = uid;
        this.prezzo = prezzo;
        this.author = author;

    }
    
}