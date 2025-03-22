import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Auth, signInWithPopup } from '@angular/fire/auth';
import { GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Firestore, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserData } from '../classes/user-data';
import { GiocoVenduto } from '../classes/gioco-venduto';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private firestore: Firestore = inject(Firestore);
  private _currentGame: WritableSignal<GiocoVenduto | null> = signal<GiocoVenduto | null>(null)
  currentGame: Signal<GiocoVenduto | null> = this._currentGame.asReadonly()


  constructor() { }

  async getStoreGame(): Promise<any>{
    try{
      
      const gamaDocRef = collection(this.firestore, `gamesVenduti/gameid/offers`);
      console.log(gamaDocRef);
      const gameDataDoc = (await collectionData(gamaDocRef));
      console.log(gameDataDoc);
    }
    catch(error){
      console.log("Errore nel recupero dei giochi venduti:", error);
    }
/*     try {
      const gamesCollectionRef = collection(this.firestore, 'gamesVenduti');
      const gamesSnapshot = await getDocs(gamesCollectionRef);
      const gamesList = gamesSnapshot.docs.map(doc => doc.data() as GiocoVenduto);
      return gamesList;
    } catch (error) {
      console.log("Errore nel recupero dei giochi venduti:", error);
      return [];
    } */
  }

  async loadGame(id: string): Promise<any>{
    const gamaDocRef = doc(this.firestore, `game/${id}`)
    const gamaDataDoc = (await getDoc(gamaDocRef)).data();
    console.log(gamaDataDoc);
    return gamaDataDoc;
  }

  async saveGame(game: GiocoVenduto): Promise<void>{
    const gameRef = doc(this.firestore, `game/${game.uid}`);
    await setDoc(gameRef, {...game}, {merge:true});
  }



}
