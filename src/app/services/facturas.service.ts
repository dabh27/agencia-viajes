import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura.models';


@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7088/api/facturas';

  constructor() { }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/Getlist`);
  }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  // Emitir factura
  crearFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.apiUrl}/Create`, factura);
  }

  // Anular o editar
  actualizarFactura(factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/Update`, factura);
  }

  eliminarFactura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}