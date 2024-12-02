import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/usuario.model';
import { UsuarioService } from '../../core/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrl: './crear-cita.component.css'
})
export class CrearCitaComponent implements OnInit{
  fecha: string = '';
  hora: string = '';
  nota: string = ''; // Para almacenar el string de servicios
  estado: string = 'pendiente'; // Estado inicial de la cita
  idCliente?: number; // Esto lo obtendrás del usuario logueado
  barberos: Usuario[] = []; // Lista de barberos
  idBarbero?: number; // ID del barbero seleccionado
  errorMessage: string = '';
  serviciosDisponibles: string[] = ['Corte de Cabello', 'Barba', 'Colorimetria', 'Ondulacion', 'Limpieza Facial'];
  serviciosSeleccionados: string[] = []; // Almacenará los servicios seleccionados

  constructor(private usuarioService: UsuarioService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'cliente') {
      this.router.navigate(['/access-denied']);
      return;
    }

    const idClienteFromStorage = localStorage.getItem('userId');
    if (idClienteFromStorage) {
      this.idCliente = +idClienteFromStorage; // Convertir a número
    }

    this.usuarioService.listarBarberos().subscribe({
      next: (barberos: Usuario[]) => {
        this.barberos = barberos;
      },
      error: err => {
        this.errorMessage = 'Error al cargar los barberos';
        console.error(err);
      }
    });
  }

  toggleServicio(servicio: string): void {
    const index = this.serviciosSeleccionados.indexOf(servicio);
    if (index > -1) {
      this.serviciosSeleccionados.splice(index, 1); // Desseleccionar servicio
    } else {
      this.serviciosSeleccionados.push(servicio); // Seleccionar servicio
    }
  }

  crearCita() {
    this.nota = this.serviciosSeleccionados.join(', '); // Convertimos el array a string

    const nuevaCita = {
      fecha: this.fecha,
      hora: this.hora,
      nota: this.nota, // String de servicios seleccionados
      estado: this.estado,
      cliente: {
        idUsuario: this.idCliente
      },
      barbero: {
        idUsuario: this.idBarbero
      }
    };

    this.http.post('http://localhost:8080/citas', nuevaCita).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Cita Creada!',
          text: 'Tu cita ha sido agendada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/user-dashboard']);
        });
      },
      error: err => {
        this.errorMessage = 'Error al crear la cita';
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear la cita. Inténtalo nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }


}
