import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../classes/user-data';

@Component({
  selector: 'app-login',
  standalone: true, // Aggiungi questa riga se stai usando Angular standalone components
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  private authService: AuthService = inject(AuthService);
  currentUser: Signal<UserData | null> = this.authService.currentUser;




  async login() {
    try {
      await this.authService.login();
    }
    catch (error) {
      console.log('Errore durante il login: ', error)
    }
  }

  async logout() {
    await this.authService.logout();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Username:', this.username);
      console.log('Password:', this.password);
    }
  }

  annulla(): void {
    //tornare alla pagina iniziale
    console.log('Annulla');
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}