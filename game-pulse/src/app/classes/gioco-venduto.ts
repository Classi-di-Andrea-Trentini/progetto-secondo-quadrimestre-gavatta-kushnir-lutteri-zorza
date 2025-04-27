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
    gameImg: string = "cs16.jpg"
    title: string = "Nessun titolo";
    constructor(uid: string, prezzo: number, author: string, Uidauthor: string, idDoc: string, description: string = "Nessuna descrizione", gameImg: string, title: string) {
        this.description = description;
        this.uid = uid;
        this.prezzo = prezzo;
        this.author = author;
        this.Uidauthor = Uidauthor;
        this.data = new Date();
        this.idDoc = idDoc;
        this.gameImg = gameImg;
        this.title = title;
    }
    
}