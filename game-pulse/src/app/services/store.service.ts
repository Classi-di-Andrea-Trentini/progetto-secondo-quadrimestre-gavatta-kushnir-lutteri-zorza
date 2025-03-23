import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Auth, signInWithPopup } from '@angular/fire/auth';
import { GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Firestore, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserData } from '../classes/user-data';
import { GiocoVenduto } from '../classes/gioco-venduto';
import { collection, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private firestore: Firestore = inject(Firestore);
  private _currentGame: WritableSignal<GiocoVenduto | null> = signal<GiocoVenduto | null>(null)
  currentGame: Signal<GiocoVenduto | null> = this._currentGame.asReadonly()

  constructor() { }


  /* Teoria
  Firestore: database NoSQL e scalabile
  Organizzato in collezioni e documenti
  Collezioni: insiemi di documenti numeri dispari
  Documenti: contiene i dati numeri pari


  collection() : restituisce un riferimento a una collezione
  doc() : restituisce un riferimento a un documento

  setDoc(docRef: DocumentReference, data: any, options?: SetOptions): crea un nuovo documento completo o aggiorna uno esistente
  updateDoc(docRef: DocumentReference, data: any) : aggiorna un documento esistent
  addDoc(collectionRef: CollectionReference, data: any) : crea un nuovo documento con un ID generato automaticamente
  getDoc(docRef: DocumentReference) : legge i dati del documento una sola volta
  getDocs(collectionRef: CollectionReference) : legge una collezione
  deleteDoc(docRef: DocumentReference) : elimina un documento
  docData(docRef: DocumentReference, options?: { idField?: string }) : legge i dati di un documento come un Observable. emmette un volarore ogni volta che i dati cambiano
  collectionData(collectionRef: CollectionReference, options?: { idField?: string }) : legge i dati di una collezione come un Observable. emmette un volarore ogni volta che i dati cambiano
  
  */

  async getStoreGame(): Promise<GiocoVenduto[] | null>{
    try{
      const giochiVenduti: GiocoVenduto[] = [];
      const gamerefData  = collection(this.firestore, 'store/gameid/offers');
      const gamerefDataDoc = (await getDocs(gamerefData));
      gamerefDataDoc.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
        giochiVenduti.push(doc.data() as GiocoVenduto);
      });
      return giochiVenduti;
      
    }
    catch(error){
      console.log("Errore nel recupero dei giochi venduti:", error);
      return null;
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
