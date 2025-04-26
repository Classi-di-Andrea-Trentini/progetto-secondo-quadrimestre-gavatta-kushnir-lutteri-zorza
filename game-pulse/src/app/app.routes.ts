import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageGameComponent } from './components/page-game/page-game.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { TestNegozioComponentPoteteancheEliminarloComponent } from './components/tabella per uploadare il gioco/test-negozio-component-poteteanche-eliminarlo.component';
import { ExploreGamesComponent } from './components/explore-games/explore-games.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { CommunityComponent } from './components/community/community.component';
import { CommunityAccountComponent } from './components/community-account/community-account.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'game/:id', component: PageGameComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'user', component: AccountComponent},
    { path: 'test', component: TestNegozioComponentPoteteancheEliminarloComponent },
    { path: 'category', component: ExploreGamesComponent},
    { path: 'community', component: CommunityComponent},
    { path: 'user/:id', component: CommunityAccountComponent},
    { path: '', component: HeroSectionComponent},
    { path: '**', redirectTo: '' }
];