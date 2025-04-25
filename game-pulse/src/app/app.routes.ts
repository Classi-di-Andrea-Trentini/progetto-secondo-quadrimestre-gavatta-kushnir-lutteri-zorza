import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageGameComponent } from './components/page-game/page-game.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { TestNegozioComponentPoteteancheEliminarloComponent } from './components/test-negozio-component-poteteanche-eliminarlo/test-negozio-component-poteteanche-eliminarlo.component';
import { ExploreGamesComponent } from './components/explore-games/explore-games.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'game/:id', component: PageGameComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'user', component: AccountComponent},
    { path: 'test', component: TestNegozioComponentPoteteancheEliminarloComponent },
    { path: 'category', component: ExploreGamesComponent}
];