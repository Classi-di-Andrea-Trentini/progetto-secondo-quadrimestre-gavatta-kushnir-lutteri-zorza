import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageGameComponent } from './page-game/page-game.component';
import { HomeComponent } from './home/home.component';



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'game/:id', component: PageGameComponent},
    { path: 'login', component: LoginComponent}
    
];