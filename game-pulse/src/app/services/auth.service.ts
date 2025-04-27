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
 
    for (let i = 1; i <= 100; i++) {
      const fakeUser = user;
      fakeUser.userNickname = `${this.generateRandomWord()}+${i}`;
      fakeUser.avatarImg = `https://avatar.iran.liara.run/public/`;
      fakeUser.backgroundImage = this.generateRandomBackground();
      fakeUser.uid = `${user.uid}+${i}`;
      const userRef = doc(this.firestore, `users/${user.uid}+${i}`);
      await setDoc(userRef, {...user}, { merge: true });
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

private generateRandomBackground(): string {
  const words = [
    'https://www.google.com/imgres?q=background&imgurl=https%3A%2F%2Fimages.rawpixel.com%2Fimage_800%2FczNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMDktYWV3LTAxM18xXzEuanBn.jpg&imgrefurl=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fbackground&docid=4J1ldUOSjxhIYM&tbnid=wX-haZyI6-0WcM&vet=12ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECGkQAA..i&w=800&h=533&hcb=2&ved=2ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECGkQAA',
    'https://www.google.com/imgres?q=background&imgurl=https%3A%2F%2Fplus.unsplash.com%2Fpremium_photo-1701534008693-0eee0632d47a%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fwebsite-background&docid=i87nyesG_kN4QM&tbnid=Ep05NyLWfLZ0yM&vet=12ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECB0QAA..i&w=3000&h=1688&hcb=2&itg=1&ved=2ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECB0QAA',
    'https://www.google.com/imgres?q=background&imgurl=https%3A%2F%2Fwww.creativefabrica.com%2Fwp-content%2Fuploads%2F2022%2F05%2F17%2FFuturistic-Red-Blue-Background-Design-Graphics-30683310-1.jpg&imgrefurl=https%3A%2F%2Fwww.creativefabrica.com%2Fit%2Fproduct%2Ffuturistic-red-blue-background-design%2F&docid=71MDZ2dND0SFPM&tbnid=r9LOL1gDd6pPVM&vet=12ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECHMQAA..i&w=3125&h=2000&hcb=2&ved=2ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECHMQAA',
    'https://www.google.com/imgres?q=background&imgurl=https%3A%2F%2Fstorage.pixteller.com%2Fdesigns%2Fdesigns-images%2F2019-03-27%2F05%2Fsimple-background-backgrounds-passion-simple-1-5c9b95c3a34f9.png&imgrefurl=https%3A%2F%2Fpixteller.com%2Ftemplates%2Fcustom-visuals%2Fsimple-background-backgrounds-passion-id1585819&docid=rI0wZBGnJRSpWM&tbnid=LX30AIne982mbM&vet=12ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECEsQAA..i&w=1920&h=1080&hcb=2&ved=2ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECEsQAA',
    'https://www.google.com/imgres?q=background&imgurl=https%3A%2F%2Fmy.alfred.edu%2Fzoom%2F_images%2Ffoster-lake.jpg&imgrefurl=https%3A%2F%2Fmy.alfred.edu%2Fzoom%2F&docid=RQcpb9nW-cFNfM&tbnid=zJhbiLqDhBOogM&vet=12ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECGsQAA..i&w=5797&h=3261&hcb=2&ved=2ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECGsQAA',
    'https://www.google.com/imgres?q=background&imgurl=https%3A%2F%2Fwallpapers.com%2Fimages%2Ffeatured%2Fgreen-background-ivfksvptao7sdhrg.jpg&imgrefurl=https%3A%2F%2Fwallpapers.com%2Fgreen-background&docid=IngcK2K19U2oqM&tbnid=JQ0VmXnbsBD4XM&vet=12ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECFEQAA..i&w=1920&h=1080&hcb=2&ved=2ahUKEwjFpIqoqfaMAxX29LsIHdD1OqUQM3oECFEQAA',
    'https://www.google.com/imgres?q=background&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F304664%2Fpexels-photo-304664.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-martinpechy-304664.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Flight%2520blue%2520background%2F&docid=LwlEVggGrZzPxM&tbnid=SEqYcIpR1JGP-M&vet=12ahUKEwiT9tPnqfaMAxXfhf0HHeu8Ikw4ChAzegQIcRAA..i&w=5184&h=3456&hcb=2&ved=2ahUKEwiT9tPnqfaMAxXfhf0HHeu8Ikw4ChAzegQIcRAA',
    'https://www.google.com/imgres?q=background&imgurl=https%3A%2F%2Flumiere-a.akamaihd.net%2Fv1%2Fimages%2Fsa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg&imgrefurl=https%3A%2F%2Fnews.disney.com%2Fpixar-video-backgrounds-available&docid=jElKzTBoNCfDyM&tbnid=RljsUpymoO-XQM&vet=12ahUKEwiT9tPnqfaMAxXfhf0HHeu8Ikw4ChAzegQIQxAA..i&w=1920&h=1080&hcb=2&ved=2ahUKEwiT9tPnqfaMAxXfhf0HHeu8Ikw4ChAzegQIQxAA'
  ];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
} 



  

  async updateCurrentUser(user: UserData): Promise<void>{
    this._currentUser.set(user)
  }

}