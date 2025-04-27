import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { UserData } from '../../classes/user-data';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUsersDataService } from '../../services/get-users-data.service';

@Component({
  selector: 'app-community-account',
  imports: [],
  templateUrl: './community-account.component.html',
  styleUrl: './community-account.component.css'
})
export class CommunityAccountComponent {
  user: WritableSignal<UserData | null> = signal<UserData | null>(null);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  getUserData: GetUsersDataService = inject(GetUsersDataService);
  constructor() { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametriNellaURL) => {
      let id: string = parametriNellaURL['id'];
    
      this.getUserData.searchUserByID(id).then((dati) => {
        console.log("dati:", dati);
        this.user.set(dati);
        console.log("dati:", this.user()?.avatarImg);
      });
    });
  }
  

}
