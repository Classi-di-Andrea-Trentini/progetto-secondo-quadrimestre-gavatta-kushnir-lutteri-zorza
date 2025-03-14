import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  private authService:AuthService = inject(AuthService);

  
  onImageChange(event: any): void {
    console.log('Immagine cambiata');
  }
}
