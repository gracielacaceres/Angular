import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaRequest } from '../shared/venta-request.model';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = 'http://localhost:8080/api/ventas/registrar';
  private Url = 'http://localhost:8080/api/ventas/listar';

  constructor(private http: HttpClient) {}

  registrarVenta(venta: VentaRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, venta);
  }

  listarVentas(): Observable<VentaRequest[]> {
    return this.http.get<VentaRequest[]>(this.Url);
  }


  // Obtener las ventas activas
  listarVentasActivas(): Observable<VentaRequest[]> {
    return this.http.get<VentaRequest[]>(`${this.Url}/activas`);
  }

  // Obtener las ventas inactivas
  listarVentasInactivas(): Observable<VentaRequest[]> {
    return this.http.get<VentaRequest[]>(`${this.Url}/inactivas`);
  }
   
}
