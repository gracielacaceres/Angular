import { Component } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { Pago } from '../../model/pago.model'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  pagos: Pago[] = [];
  pagoDetalle: any = null;

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.pagoService.listarPagos().subscribe(
      (data) => (this.pagos = data),
      (error) => console.error(error)
    );
  }

  eliminarPago(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el pago.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pagoService.eliminarPago(id).subscribe(
          () => {
            this.cargarPagos();
            Swal.fire('Eliminado', 'El pago ha sido eliminado.', 'success');
          },
          (error) => console.error(error)
        );
      }
    });
  }

  reactivarPago(id: number): void {
    Swal.fire({
      title: '¿Reactivar pago?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, reactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pagoService.reactivarPago(id).subscribe(
          () => {
            this.cargarPagos();
            Swal.fire('Reactivado', 'El pago ha sido reactivado.', 'success');
          },
          (error) => console.error(error)
        );
      }
    });
  }

  verDetalle(id: number): void {
    this.pagoService.obtenerDetallePago(id).subscribe(
      (data) => (this.pagoDetalle = data),
      (error) => console.error(error)
    );
  }

  cerrarModal(): void {
    this.pagoDetalle = null;
  }
}
