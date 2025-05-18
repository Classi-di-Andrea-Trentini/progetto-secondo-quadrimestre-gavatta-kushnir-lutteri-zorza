import { Component, inject, signal, WritableSignal } from '@angular/core';
import { UserData } from '../../classes/user-data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { GetUsersDataService } from '../../services/get-users-data.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-community',
  imports: [ReactiveFormsModule, RouterLink,RouterLinkActive],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {
  users: WritableSignal<UserData[] | null> = signal<UserData[] | null>(null); // Lista completa degli utenti
  paginatedUsers: [UserData[]] = [[]]; // Utenti mostrati nella pagina corrente
  gameName: FormControl = new FormControl('');

  getUsers: GetUsersDataService = inject(GetUsersDataService);
  constructor() {
  }


  ngOnInit(): void {
    this.getUsers.fetchUsers(this.gameName.value).then(dati => {
      this.users.set(dati);
      console.log(this.users());
    });

    this.gameName.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(nome => {
        return this.getUsers.fetchUsers(nome);
      })
    )
      .subscribe(dati => {
        this.users.set(dati);
        console.log(this.users());
      });
  }
}
