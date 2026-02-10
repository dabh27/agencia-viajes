import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { JsonResponse } from '../../../models/api-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  error: string | null = null;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.error = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: (resp: JsonResponse<any>) => {
        if (resp.success) {
          // Guardar sesión
          this.authService.guardarSesion(resp.data);

          // Redirigir
          this.router.navigate(['/home']);
        } else {
          this.error = resp.message || 'Credenciales incorrectas';
        }
        this.cargando = false;
      },
      error: () => {
        console.error('❌ Error login:');
        this.error = 'Error de servidor';
        this.cargando = false;
      }
    });
  }
}
