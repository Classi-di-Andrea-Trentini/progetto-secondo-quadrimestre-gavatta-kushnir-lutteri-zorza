import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Username:', this.username);
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }

  annulla(): void {
    // Return to the home page or perform cancel action
    console.log('Annulla');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}