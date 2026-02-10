import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  irARuta(ruta: string): void {
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate([ruta]);
  }

  accionSesion(): void {
    if (this.authService.estaLogueado()) {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
