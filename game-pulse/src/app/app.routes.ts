import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageGameComponent } from './components/page-game/page-game.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'game/:id', component: PageGameComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}

    
];