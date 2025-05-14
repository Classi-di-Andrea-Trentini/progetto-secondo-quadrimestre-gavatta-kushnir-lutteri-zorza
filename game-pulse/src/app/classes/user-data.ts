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
    descrizione: string;
    backgroundImage: string;
    avatarImg: string;
    dataCreazione: Date;

    constructor(uid: string, userNickname: null | string,email: null | string, photoURL: null | string) {       
        this.uid = uid;
        this.giochi_in_vendita = [];
        this.userNickname = userNickname;
        this.email = email;
        this.photoURL = photoURL;
        this.money = 0;
        this.descrizione = "";
        this.backgroundImage = "/image.png";
        this.dataCreazione = new Date();
        this.avatarImg = "/prifodonna.png"
    }

    
}