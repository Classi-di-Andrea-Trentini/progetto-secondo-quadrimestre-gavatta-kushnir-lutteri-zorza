import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';
import { UserData } from '../../classes/user-data';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  authService: AuthService = inject(AuthService);
  newUser: Signal<User | null> = this.authService.newUser;

  async register() {
    console.log("sto registrando")
    if(this.newUser()) {
      const userData = new UserData( 
        this.newUser()?.uid ?? "",
        this.username,
        this.newUser()?.email ?? "",
        this.newUser()?.photoURL ?? ""
      );
      await this.authService.saveUserData(userData);      
    }
  } 

  async logout() {
    await this.authService.logout();
  }



  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Username:', this.username);
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
    this.register()

  }

  annulla(): void {
    // Return to the home page or perform cancel action
    console.log('Annulla');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}