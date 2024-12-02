import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { PagoService } from '../../services/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-pendientes',
  templateUrl: './citas-pendientes.component.html',
  styleUrl: './citas-pendientes.component.css'
})
export class CitasPendientesComponent {
  citasPendientes: any[] = [];
  mostrarFormularioPago: boolean = false;
  idCitaSeleccionada: number | null = null;
  nuevoPago = {
    corteRealizado: '',
    monto: 0,
    fechaPago: '',
    horaPago: ''
  };

  constructor(private citaService: CitaService, private pagoService: PagoService) {}

  ngOnInit(): void {
    this.cargarCitasPendientes();
  }

  cargarCitasPendientes(): void {
    this.citaService.listarCitasPendientes().subscribe(citas => {
      this.citasPendientes = citas;
    });
  }

  confirmarCancelacion(idCita: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cancelar esta cita?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cambiarEstado(idCita, 'cancelado');
      }
    });
  }

  cambiarEstado(idCita: number, nuevoEstado: string): void {
    this.citaService.cambiarEstadoCita(idCita, nuevoEstado).subscribe(
      () => {
        Swal.fire('¡Cancelado!', 'La cita ha sido cancelada.', 'success');
        this.cargarCitasPendientes();
      },
      (error) => {
        console.error('Error al cambiar el estado de la cita:', error);
        Swal.fire('Error', 'No se pudo cancelar la cita.', 'error');
      }
    );
  }

  abrirFormularioPago(idCita: number): void {
    this.idCitaSeleccionada = idCita;
    this.mostrarFormularioPago = true;
  }

  cancelarFormularioPago(): void {
    this.mostrarFormularioPago = false;
    this.idCitaSeleccionada = null;
    this.nuevoPago = { corteRealizado: '', monto: 0, fechaPago: '', horaPago: '' };
  }

  registrarPago(): void {
    if (this.idCitaSeleccionada) {
      const pago = {
        cita: { idCita: this.idCitaSeleccionada },
        corteRealizado: this.nuevoPago.corteRealizado,
        monto: this.nuevoPago.monto,
        fechaPago: this.nuevoPago.fechaPago,
        horaPago: this.nuevoPago.horaPago
      };

      this.pagoService.crearPago(pago).subscribe(
        () => {
          Swal.fire('Pago registrado', 'El pago se ha registrado con éxito', 'success');
          this.mostrarFormularioPago = false;
          this.cargarCitasPendientes();
        },
        (error) => {
          console.error('Error al registrar el pago:', error);
          Swal.fire('Error', 'No se pudo registrar el pago. Por favor, verifica los datos e intenta nuevamente.', 'error');
        }
      );
    }
  }



}
