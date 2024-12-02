import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pago } from '../model/pago.model';
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = `${environment.apiUrl}/pagos`;


  constructor(private http: HttpClient) {}

  // Filtrar pagos por parámetros dinámicos
  filtrarPagos(idBarbero: number, fechaInicio: string, fechaFin: string, porcentaje: number): Observable<any[]> {
    const params = new HttpParams()
      .set('idBarbero', idBarbero.toString())
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin)
      .set('porcentaje', porcentaje.toString());

    return this.http.get<any[]>(`${this.apiUrl}/filtrar`, { params });
  }

  crearPago(pago: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, pago);
  }

  listarPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  obtenerPago(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  obtenerDetallePago(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/detalle`);
  }


  guardarPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }

  actualizarPago(id: number, pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/${id}`, pago);
  }

  eliminarPago(id: number): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/eliminar/${id}`, {});
  }

  reactivarPago(id: number): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/${id}/reactivar`, {});
  }
}
