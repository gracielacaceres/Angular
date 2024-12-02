import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isAdmin = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Obtener el rol del usuario logueado desde localStorage
    const userRole = localStorage.getItem('userRole');

    // Verificar si el usuario tiene el rol 'admin'
    if (userRole === 'admin') {
      this.isAdmin = true;
    } else {
      // Si no es admin, redirigir a la página de acceso denegado
      this.router.navigate(['/access-denied']);
    }
  }

  logout() {
    // Eliminar los datos almacenados en el localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }


}

