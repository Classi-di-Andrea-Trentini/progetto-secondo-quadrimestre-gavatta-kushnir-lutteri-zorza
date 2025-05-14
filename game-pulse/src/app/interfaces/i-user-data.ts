import { User } from "firebase/auth";

export interface IUserData extends User {
    uid: string
    games: string[]
    // Add more properties as needed
}