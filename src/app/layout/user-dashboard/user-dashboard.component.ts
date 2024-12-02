import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verificarRolCliente();
  }

  verificarRolCliente() {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'cliente') {
      alert('No tienes acceso a esta página');
      this.router.navigate(['/login']);
    }
  }

  irACrearCita() {
    this.router.navigate(['/crear-cita']);
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

}
