import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../models/api-response.model';
import { Reserva, ReservaListar } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'https://localhost:7088/api/reservas';

  constructor(private http: HttpClient) {}

  // Obtener lista para la tabla (Usa el modelo ReservaListar)
  getReservas(): Observable<JsonResponse<ReservaListar[]>> {
    return this.http.get<JsonResponse<ReservaListar[]>>(`${this.apiUrl}/Getlist`);
  }

  // Obtener UNA reserva para editar (Usa el modelo Reserva con IDs)
  getReserva(id: number): Observable<JsonResponse<Reserva>> {
    return this.http.get<JsonResponse<Reserva>>(`${this.apiUrl}/${id}`);
  }

  // Crear (Envía el modelo con IDs)
  crearReserva(reserva: Reserva): Observable<JsonResponse<Reserva>> {
    return this.http.post<JsonResponse<Reserva>>(`${this.apiUrl}/Create`, reserva);
  }

  // Actualizar (Envía el modelo con IDs)
  actualizarReserva(reserva: Reserva): Observable<JsonResponse<Reserva>> {
    return this.http.put<JsonResponse<Reserva>>(`${this.apiUrl}/Update`, reserva);
  }

  // Eliminar
  eliminarReserva(id: number): Observable<JsonResponse<boolean>> {
    return this.http.delete<JsonResponse<boolean>>(`${this.apiUrl}/${id}`);
  }
}