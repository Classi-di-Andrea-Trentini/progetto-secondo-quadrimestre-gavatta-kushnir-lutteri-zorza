import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { UserData } from '../classes/user-data';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc, getDoc, orderBy, query } from 'firebase/firestore';
import Fuse from 'fuse.js';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetUsersDataService {
  
  private firestore: Firestore = inject(Firestore);
  
  private _users: WritableSignal<UserData[] | null> = signal<UserData[] | null>(null);
  users: Signal<UserData[] | null> = this._users.asReadonly();
  constructor() { }


  async fetchUsers(searchTerm: string): Promise<UserData[] | null> {
    const usersCollection = collection(this.firestore, 'users');
    const usersQuery = query(usersCollection, orderBy('userNickname')); // Ordina alfabeticamente

    return new Promise((resolve) => {
      collectionData(usersQuery).subscribe((data) => {
        // Effettua il cast esplicito dei dati
        const userData = data.map(doc => doc as UserData); // Trasforma i dati in UserData[]
        if (searchTerm) {
          const fuse = new Fuse(userData, { keys: ['userNickname'], threshold: 0.4 }); // Configura Fuse.js
          const filteredData = fuse.search(searchTerm).map(result => result.item);
          this._users.set(filteredData);
          resolve(filteredData);
          console.log(filteredData);
        } else {
          this._users.set(userData);
          resolve(userData);
        }
      });
    });
  }
/*   async fetchUsers(searchTerm: string): Promise<UserData[] | null> {
    const usersCollection = collection(this.firestore, 'users');
    const usersQuery = query(usersCollection, orderBy('userNickname')); // Ordina alfabeticamente
    collectionData(usersQuery, { idField: 'id' }).subscribe((data) => {
    // Effettua il cast esplicito dei dati
    const userData = data.map(doc => doc as UserData); // Trasforma i dati in UserData[]
    if (searchTerm) {
      const fuse = new Fuse(userData, { keys: ['userNickname'], threshold: 0.4 }); // Configura Fuse.js
      const filteredData = fuse.search(searchTerm).map(result => result.item);
      this._users.set(filteredData);
    } else {
      this._users.set(userData);
    }
  });
  } */

  async searchUserByID(id: string): Promise<UserData> {
    console.log("id:", id);
    const userDoc = doc(this.firestore, 'users/',id);
    console.log("userDoc:", userDoc);
    console.log((await getDoc(userDoc)).data());
    return (await getDoc(userDoc)).data() as UserData;
  }

}
