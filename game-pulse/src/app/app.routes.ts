import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageGameComponent } from './page-game/page-game.component';



export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'game/:id', component: PageGameComponent}
    
];