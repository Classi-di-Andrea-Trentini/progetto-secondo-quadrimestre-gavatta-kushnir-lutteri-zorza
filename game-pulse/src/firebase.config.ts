// app.module.ts (for an older AngularFire version)
import { AngularFireModule } from '@angular/fire'; // older version import
import { AngularFireDatabaseModule } from '@angular/fire/database'; // older version import
import { firebaseConfig } from './firebase.config';


@NgModule({
  // ...other imports
  imports: [
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFireDatabaseModule
  ],
  // ... rest of the module
})
export class AppModule { }