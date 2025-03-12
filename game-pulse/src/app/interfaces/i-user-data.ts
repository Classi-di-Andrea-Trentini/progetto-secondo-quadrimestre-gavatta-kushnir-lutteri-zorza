import { User } from "firebase/auth";

export interface IUserData extends User {
    nome: string;
    cognome: string;
    note: string;
}