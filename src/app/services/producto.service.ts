import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../shared/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }


  // Obtener todos los productos
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}`);
  }

  // Obtener productos activos (estado = 1)
  listarProductosActivos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/activos`);
  }

  // Obtener productos inactivos (estado = 0)
  listarProductosInactivos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/inactivos`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }

 
  // Método para obtener productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método para eliminar un producto lógicamente (cambiando su estado)
  deleteProducto(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/delete/${id}`, {});  // Ajusta la URL y el cuerpo de la solicitud según tu backend
  }

  

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  restaurarProducto(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/restaurar/${id}`, {});
  }
}
