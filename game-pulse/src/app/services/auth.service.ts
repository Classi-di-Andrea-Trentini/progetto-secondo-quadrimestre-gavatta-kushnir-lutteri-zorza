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
    const id= user.uid;
    for (let i = 1; i <= 100; i++) {
      const fakeUser = user;
      fakeUser.descrizione = this.generateRandomGameDescription()
      fakeUser.userNickname = `${this.generateRandomWord()}+${i}`;
      fakeUser.avatarImg = `https://avatar.iran.liara.run/public/${i}`;
      fakeUser.backgroundImage = this.generateRandomBackground();
      fakeUser.uid = `${id}+${i}`;
      const userRef = doc(this.firestore, `users/${id}+${i}`);
      await setDoc(userRef, {...fakeUser}, { merge: true });
      console.log(`Utente fittizio ${i} salvato.`);
    } 
  }


private generateRandomWord(): string {
  const words = [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 
    'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 
    'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'Trentini', 
    'Giordani', 'Gennari', 'Zanoni','Zanoni','Trentini','IlTrentins1968',
    'ErGennaro','IlGennaro'
  ];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
} 


private generateRandomGameDescription(): string {
  const descriptions = [
    'Appassionato di RPG e avventure epiche.',
    'Collezionista di giochi indie e platform.',
    'Esperto di sparatutto e giochi d’azione.',
    'Amante delle strategie e dei giochi gestionali.',
    'Fan dei giochi sportivi e delle simulazioni.',
    'Sempre alla ricerca di nuove sfide multiplayer.',
    'Adoro esplorare mondi open world.',
    'Competitivo nei giochi di carte e puzzle.',
    'Seguace delle saghe fantasy più famose.',
    'Giocatore nostalgico di retro games.',
    'Costruttore di città e imperi virtuali.',
    'Cacciatore di trofei e completista.',
    'Streamer di gameplay e recensioni.',
    'Appassionato di storie coinvolgenti.',
    'Fanatico di speedrun e record.',
    'Maestro nei giochi di combattimento.',
    'Amico fedele nelle co-op online.',
    'Esploratore di dungeon e misteri.',
    'Creatore di mod e contenuti personalizzati.',
    'Sempre aggiornato sulle ultime uscite.'
  ];
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
}

private generateRandomBackground(): string {
  const words = [
    "/background/base1.jpg",
    "/background/base2.jpg",
    "/background/base3.jpg",
    "/background/base4.jpg",
    "/background/base5.jpg",
    "/background/base6.jpg",
    "/background/base7.jpg",
    "/background/base8.jpg",
    "/background/base9.jpg",
    "/background/base10.jpg"
  ];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
} 



  

  async updateCurrentUser(user: UserData): Promise<void>{
    this._currentUser.set(user)
  }

}