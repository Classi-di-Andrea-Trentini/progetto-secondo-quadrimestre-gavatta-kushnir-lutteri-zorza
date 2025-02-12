import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

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