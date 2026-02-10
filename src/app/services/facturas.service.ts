import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../models/api-response.model';
import { CreateFactura, Factura, FacturaListar } from '../models/factura.models';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'https://localhost:7088/api/facturas'; // Ajusta el puerto

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<JsonResponse<FacturaListar[]>> {
    return this.http.get<JsonResponse<FacturaListar[]>>(`${this.apiUrl}/Getlist`);
  }

  getFacturaById(id: number): Observable<JsonResponse<Factura>> {
    return this.http.get<JsonResponse<Factura>>(`${this.apiUrl}/${id}`);
  }

  crearFactura(factura: CreateFactura): Observable<JsonResponse<boolean>> {
    return this.http.post<JsonResponse<boolean>>(`${this.apiUrl}/Create`, factura);
  }

  anularFactura(id: number): Observable<JsonResponse<boolean>> {
    return this.http.delete<JsonResponse<boolean>>(`${this.apiUrl}/${id}`);
  }
}