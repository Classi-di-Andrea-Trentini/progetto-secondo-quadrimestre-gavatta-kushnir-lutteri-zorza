import { UserMetadata, UserInfo, IdTokenResult } from "firebase/auth";
import { IUserData } from "../interfaces/i-user-data";
import { InfoGioco } from "./info-gioco";
import { GiocoVenduto } from "./gioco-venduto";

export class UserData {
    uid: string;
    giochi_in_vendita: GiocoVenduto[]
    userNickname: null | string;
    email: null | string;
    photoURL: null | string;
    money: number;

    constructor(uid: string, userNickname: null | string,email: null | string, photoURL: null | string) {       
        this.uid = uid;
        this.giochi_in_vendita = [];
        this.userNickname = userNickname;
        this.email = email;
        this.photoURL = photoURL;
        this.money = 0;
    }

    
}