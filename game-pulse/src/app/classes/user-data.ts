import { UserMetadata, UserInfo, IdTokenResult } from "firebase/auth";
import { IUserData } from "../interfaces/i-user-data";
import { InfoGioco } from "./info-gioco";
import { GiocoVenduto } from "./gioco-venduto";

export class UserData {
    uid: string;
    giochi_in_vendita: GiocoVenduto[]
    displayName: null | string;
    email: null | string;
    photoURL: null | string;

    constructor(uid: string, displayName: null | string,email: null | string, photoURL: null | string) {       
        this.uid = uid;
        this.giochi_in_vendita = [];
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL;

    }
    
}