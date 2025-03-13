import { UserMetadata, UserInfo, IdTokenResult } from "firebase/auth";
import { IUserData } from "../interfaces/i-user-data";
import { InfoGioco } from "./info-gioco";

export class UserData {
    uid: string;
    games: InfoGioco[]

    constructor(uid: string, games: InfoGioco[]) {       
        this.uid = uid;
        this.games = games;
    }
    
}