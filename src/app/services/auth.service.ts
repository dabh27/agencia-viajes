import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { JsonResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7088/api/Usuario';

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; clave: string }) {
    return this.http.post<JsonResponse<any>>(
      `${this.apiUrl}/login`,
      credentials 
    );
  }

  guardarSesion(usuario: any): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', 'logueado');
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }
}