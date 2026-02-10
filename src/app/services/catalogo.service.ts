import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

 
  private apiUrl = 'https://localhost:7088/api/catalogos'; 

  constructor(private http: HttpClient) {}

  getCiudades(): Observable<JsonResponse<any[]>> {
    return this.http.get<JsonResponse<any[]>>(`${this.apiUrl}/ciudades`);
  }

  getTiposPasajero(): Observable<JsonResponse<any[]>> {
    return this.http.get<JsonResponse<any[]>>(`${this.apiUrl}/tipos-pasajero`);
  }

  getTiposPasaje(): Observable<JsonResponse<any[]>> {
    return this.http.get<JsonResponse<any[]>>(`${this.apiUrl}/tipos-pasaje`);
  }
}