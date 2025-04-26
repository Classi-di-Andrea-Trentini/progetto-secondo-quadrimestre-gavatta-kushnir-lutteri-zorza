import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Auth, signInWithPopup } from '@angular/fire/auth';
import { GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserData } from '../classes/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  private isLoggedInSignal: WritableSignal<boolean> = signal(false);
  _isLoggedIn: Signal<boolean> = this.isLoggedInSignal.asReadonly();

  private _currentUser: WritableSignal<UserData | null> = signal<UserData | null>(null);
  currentUser: Signal<UserData | null> = this._currentUser.asReadonly();
  private _newUser: WritableSignal<User | null> = signal<User | null>(null);
  newUser: Signal<User | null> = this._newUser.asReadonly();


  constructor() { 
    onAuthStateChanged(this.auth, async (user) => {
      console.log('Utente loggato:', user);
      if (user) {
        const userExists: boolean = await this.userExists(user.uid);
        if (!userExists) {
          const userData = new UserData(user.uid, user.displayName,user.email,user.photoURL);
          /*          
            Se vuoi skippare il register basta decomentare queste righe 
            await this.saveUserData(userData);
            this._currentUser.set(userData); */
           console.log("user doesnt exist lets register")
           this._newUser.set(user);
           this.router.navigateByUrl('/register');
        }
        else {          
          const userData = await this.loadUserData(user.uid); 
          this._currentUser.set(userData);
          console.log('Dati utente:', this._currentUser());
          this.isLoggedInSignal.set(true);
        }      
      }
      else {
        this._currentUser.set(null);
      }
    })
  }

  async login(): Promise<void> {
    try {
      const provider: GoogleAuthProvider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      this.router.navigateByUrl('');
    }
    catch (error) {
      console.log('Errore durante il login con Google');
      console.error(error);
    }

  }

  logout(): Promise<void> {
    this._currentUser.set(null);
    this._newUser.set(null);
    this.isLoggedInSignal.set(false);
    console.log(this.currentUser());
    return signOut(this.auth);
  }
  
  private async userExists(uid: string): Promise<boolean> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.exists();
  }

  private async loadUserData(uid: string): Promise<any> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDataDoc = (await getDoc(userDocRef)).data();
    return userDataDoc;    
  }

  async saveUserData(user: UserData): Promise<void> {
    this.isLoggedInSignal.set(true);
    const userRef = doc(this.firestore, `users/${user.uid}`);
    await setDoc(userRef, {...user}, { merge: true });
    this.router.navigateByUrl('/home');

  }

  async updateCurrentUser(user: UserData): Promise<void>{
    this._currentUser.set(user)
  }

}