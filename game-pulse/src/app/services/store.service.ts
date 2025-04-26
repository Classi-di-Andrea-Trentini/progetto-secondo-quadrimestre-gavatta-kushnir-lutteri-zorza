import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Auth, signInWithPopup } from '@angular/fire/auth';
import { GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Firestore, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserData } from '../classes/user-data';
import { GiocoVenduto } from '../classes/gioco-venduto';
import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private authService: AuthService = inject(AuthService);
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

  async getStoreGame(idGioco:string): Promise<GiocoVenduto[] | null>{
    try{
      const giochiVenduti: GiocoVenduto[] = [];
      const gamerefData  = collection(this.firestore, `store/${idGioco}/offers`);
      const gamerefDataDoc = (await getDocs(gamerefData));
      gamerefDataDoc.forEach(doc => {
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


  async addGameStore(id: string, costo: number, descrizione:string, uniqueId2:string): Promise<void>{
    const gameRef = collection(this.firestore, `store/${id}/offers/`);
    const newDocRef = doc(gameRef); // Crea un riferimento al documento con un ID univoco
    const uniqueId = uniqueId2;
    console.log("Tutto ok");
    const gioco = new GiocoVenduto(id, costo,this.authService.currentUser()?.userNickname ?? "undefined" ,this.authService.currentUser()?.uid ?? "undefined", uniqueId,descrizione);
    await setDoc(newDocRef, {...gioco});    
    const userDocRef = doc(this.firestore, `users/${this.authService.currentUser()?.uid ?? "undefined"}/vendita/${uniqueId}`);
    await setDoc(userDocRef, {...gioco});
  }


/*   async addGameStore(id: string, costo: number): Promise<void>{
    const gameRef = collection(this.firestore, `store/${id}/offers/`);
    const docRef = doc(this.firestore, `store/${id}/offers/placeholder`);
    const gioco = new GiocoVenduto(id, costo, docRef);
    const addgame = await addDoc(gameRef, {uid: id, costo: costo});
  }
 */

  async deleteGameStore(idGioco: string, idOfferta:string): Promise<void>{
    const gameRef = doc(this.firestore, `store/${idGioco}/offers/${idOfferta}`);
    const deletegame = await deleteDoc(gameRef);
    return deletegame;
  }


  async buyGame(gioco: GiocoVenduto): Promise<void>{
    const user : UserData = new UserData(this.authService.currentUser()?.uid ?? "undefined", this.authService.currentUser()?.userNickname ?? "undefined", this.authService.currentUser()?.email ?? "undefined", this.authService.currentUser()?.photoURL ?? "undefined");
    user.money = (this.authService.currentUser()?.money ?? 0) - gioco.prezzo;
    console.log("Sto comprando", this.authService.currentUser()?.money ?? 0, "-", gioco.prezzo);
    await this.authService.updateCurrentUser(user);
    const userDocRef = doc(this.firestore, `users/${this.authService.currentUser()?.uid ?? "undefined"}/comprati/${gioco.idDoc}`);
    await setDoc(userDocRef, {...gioco});
  } 
}