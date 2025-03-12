import { UserMetadata, UserInfo, IdTokenResult } from "firebase/auth";
import { IUserData } from "../interfaces/i-user-data";

export class UserData {
    nome: string;
    cognome: string;
    note: string;
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
    emailVerified: boolean;
    isAnonymous: boolean;

    constructor(user: any) {
        this.nome = user.nome;
        this.cognome = user.cognome;
        this.note = user.note;
        this.displayName = user.displayName;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.photoURL = user.photoURL;
        this.providerId = user.providerId;
        this.uid = user.uid;
        this.emailVerified = user.emailVerified;
        this.isAnonymous = user.isAnonymous;       
    }
    
}