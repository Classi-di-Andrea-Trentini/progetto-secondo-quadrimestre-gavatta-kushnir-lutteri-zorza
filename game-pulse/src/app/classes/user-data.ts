import { UserMetadata, UserInfo, IdTokenResult } from "firebase/auth";
import { IUserData } from "../interfaces/i-user-data";
import { InfoGioco } from "./info-gioco";

export class UserData {
    uid: string;
    games: InfoGioco[]
    displayName: null | string;
    email: null | string;
    photoURL: null | string;

    constructor(uid: string, displayName: null | string,email: null | string, photoURL: null | string) {       
        this.uid = uid;
        this.games = [];
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL;

    }
    
}