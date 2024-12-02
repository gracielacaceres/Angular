import { Component } from '@angular/core';
import { UsuarioService } from '../../core/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userId?: number;

  constructor(private usuarioService: UsuarioService, private router: Router) {}


  login() {
    this.usuarioService.login(this.email, this.password).subscribe({
      next: (response: Usuario) => {
        console.log('Login exitoso');
        console.log('ID del usuario logueado:', response.idUsuario);
        console.log('Rol del usuario logueado:', response.rol);

        if (response.idUsuario !== undefined && response.rol) {
          // Guardar el ID y rol del usuario en localStorage
          localStorage.setItem('userId', response.idUsuario.toString());
          localStorage.setItem('userRole', response.rol);  // Guardar el rol

          // Redirigir según el rol
          if (response.rol === 'admin') {
            this.router.navigate(['/dashboard']);
          } else if (response.rol === 'cliente') {
            this.router.navigate(['/user-dashboard']);
          }
        } else {
          this.errorMessage = 'Error: ID o rol no válidos';
          console.error(this.errorMessage);
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas';
        console.error(this.errorMessage);
      }
    });
  }

}
