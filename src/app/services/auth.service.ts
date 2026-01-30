import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, UsuarioRespuesta } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7088/api/Usuario';

  constructor() { }

  login(credenciales: LoginRequest): Observable<UsuarioRespuesta> {
    return this.http.post<UsuarioRespuesta>(`${this.apiUrl}/login`, credenciales);
  }
  
  // Método útil para saber si está logueado (puedes mejorarlo luego guardando el token)
  estaLogueado(): boolean {
    // Lógica simple: si hay algo en localStorage, devuelve true
    return localStorage.getItem('usuario') ? true : false;
  }
}