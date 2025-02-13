import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GamePageComponent } from './game-page/game-page.component';



export const routes: Routes = [
    { path: '', component: GamePageComponent },
    { path: 'login', component: LoginComponent },

];