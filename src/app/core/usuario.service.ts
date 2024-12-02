import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../shared/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
  
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  listarUsuariosActivos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/activos`);
  }

  listarUsuariosInactivos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/inactivos`);
  }

  obtenerUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  recuperarCuenta(id: number): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/recuperar/${id}`, {}); // Se envía un body vacío
  }

  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, password });
  }

  // Método para listar barberos
  listarBarberos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/barberos`);
  }

}
