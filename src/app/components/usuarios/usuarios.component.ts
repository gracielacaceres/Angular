import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/usuario.model';
import { UsuarioService } from '../../core/usuario.service';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router // Añade Router aquí
  ) {}
  // ngOnInit(): void {
  //   this.cargarUsuarios('todos'); // Carga todos los usuarios por defecto
  // }

  ngOnInit(): void {
    // Obtener el rol del usuario logueado desde localStorage
    const userRole = localStorage.getItem('userRole');

    // Verificar si el usuario tiene el rol 'admin'
    if (userRole !== 'admin') {
      // Si no es admin, redirigir a la página de acceso denegado
      this.router.navigate(['/access-denied']);
    } else {
      // Si es admin, cargar los datos de usuarios
      this.cargarUsuarios('todos'); // Carga todos los usuarios por defecto
    }
  }

  cargarUsuarios(filtro: string): void {
    if (filtro === 'activos') {
      this.usuarioService.listarUsuariosActivos().subscribe((data: Usuario[]) => {
        this.usuarios = data;
      });
    } else if (filtro === 'inactivos') {
      this.usuarioService.listarUsuariosInactivos().subscribe((data: Usuario[]) => {
        this.usuarios = data;
      });
    } else {
      this.usuarioService.listarUsuarios().subscribe((data: Usuario[]) => {
        this.usuarios = data;
      });
    }
  }

  filtrarUsuarios(filtro: string): void {
    this.cargarUsuarios(filtro); // Filtrar los usuarios según el botón seleccionado
  }

  eliminarUsuario(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(id).subscribe(() => {
            this.cargarUsuarios('todos');  // Recargar usuarios después de eliminar
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
          });
        }
      });
    }
  }

  recuperarUsuario(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas restaurar esta cuenta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, restaurar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.recuperarCuenta(id).subscribe(() => {
            this.cargarUsuarios('inactivos');  // Recargar usuarios después de restaurar
            Swal.fire('¡Restaurado!', 'La cuenta ha sido restaurada.', 'success');
          });
        }
      });
    }
  }

  editarUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '100%', // Usa 100% para que se ajuste al contenedor
      maxWidth: '600px', // Ancho máximo
      disableClose: true, // Evita cerrar al hacer clic fuera del modal
      data: { usuario: { ...usuario } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.actualizarUsuario(result.idUsuario, result).subscribe(() => {
          this.cargarUsuarios('todos');  // Recargar usuarios después de editar
        });
      }
    });
  }

  abrirDialogoAgregarUsuario(): void {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.guardarUsuario(result).subscribe(
          response => {
            console.log("Usuario guardado:", response);
            this.cargarUsuarios('todos'); // Cargar nuevamente los usuarios
          },
          error => {
            console.error("Error al guardar usuario:", error);
            if (error.error) {
              // Mostrar detalles del error en la consola
              console.error("Detalles del error:", error.error);
              Swal.fire('Error', 'No se pudo guardar el usuario: ' + error.error.message, 'error');
            } else {
              Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
            }
          }
        );
      }
    });
  }

}
