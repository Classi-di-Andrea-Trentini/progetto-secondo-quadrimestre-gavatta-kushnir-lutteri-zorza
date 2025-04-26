import { DocumentReference } from "firebase/firestore";

export class GiocoVenduto {
    uid: string;
    prezzo: number;
    author: string;
    Uidauthor: string;
    idDoc: string;
    valuta: string = "€";
    data: Date = new Date();
    description: string = "Nessuna descrizione";
    constructor(uid: string, prezzo: number, author: string, Uidauthor: string, idDoc: string, description: string = "Nessuna descrizione") {
        this.description = description;
        this.uid = uid;
        this.prezzo = prezzo;
        this.author = author;
        this.Uidauthor = Uidauthor;
        this.data = new Date();
        this.idDoc = idDoc;
    }
    
}