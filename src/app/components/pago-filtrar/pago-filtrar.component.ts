import { Component } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { UsuarioService } from '../../core/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-filtrar',
  templateUrl: './pago-filtrar.component.html',
  styleUrl: './pago-filtrar.component.css'
})
export class PagoFiltrarComponent {
  idBarbero?: number;
  fechaInicio?: string;
  fechaFin?: string;
  porcentaje?: number;
  pagos: any[] = [];
  barberos: any[] = [];

  constructor(
    private pagoService: PagoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioService.listarBarberos().subscribe(
      (data: any[]) => {
        this.barberos = data;
      },
      error => {
        console.error('Error al cargar los barberos:', error);
      }
    );
  }

  filtrarPagos() {
    // Verificación de campos completos
    if (!this.idBarbero || !this.fechaInicio || !this.fechaFin || this.porcentaje === undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos antes de continuar.',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Verificación de porcentaje entre 0 y 1
    if (this.porcentaje < 0 || this.porcentaje > 1) {
      Swal.fire({
        icon: 'error',
        title: 'Porcentaje inválido',
        text: 'El porcentaje debe estar entre 0 y 1.',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Llamada al servicio si todas las validaciones pasan
    this.pagoService.filtrarPagos(this.idBarbero!, this.fechaInicio!, this.fechaFin!, this.porcentaje!)
      .subscribe((data: any[]) => {
        this.pagos = data;

        // Mensaje basado en la cantidad de registros obtenidos
        if (this.pagos.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Filtrado exitoso',
            text: `Se encontraron ${this.pagos.length} pagos.`,
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron pagos para el barbero y los filtros seleccionados.',
            confirmButtonText: 'OK'
          });
        }
      }, error => {
        console.error("Error al filtrar pagos:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el filtrado',
          text: 'Hubo un problema al intentar filtrar los pagos.',
          confirmButtonText: 'OK'
        });
      });
  }

}
