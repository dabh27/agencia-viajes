import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.models';
import { Observable } from 'rxjs';
import { JsonResponse } from '../models/api-response.model';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'https://localhost:7088/api/clientes'; // Asegúrate que es tu URL real

  constructor(private http: HttpClient) {}

  getClientes(): Observable<JsonResponse<Cliente[]>> {
    return this.http.get<JsonResponse<Cliente[]>>(
      `${this.apiUrl}/Getlist`
    );
  }


  getCliente(id: number): Observable<JsonResponse<Cliente>> {
    return this.http.get<JsonResponse<Cliente>>(
      `${this.apiUrl}/${id}`
    );
  }

  crearCliente(cliente: Cliente): Observable<JsonResponse<Cliente>> {
    return this.http.post<JsonResponse<Cliente>>(
      `${this.apiUrl}/Create`,
      cliente
    );
  }

  actualizarCliente(cliente: Cliente): Observable<JsonResponse<Cliente>> {
    return this.http.put<JsonResponse<Cliente>>(
      `${this.apiUrl}/Update`,
      cliente
    );
  }

  eliminarCliente(id: number): Observable<JsonResponse<Cliente>> {
    return this.http.delete<JsonResponse<Cliente>>(
      `${this.apiUrl}/${id}`
    );
  }
}
