import { Component,OnInit } from '@angular/core';
import { VentaService } from '../../services/venta.service';
import { VentaRequest } from '../../shared/venta-request.model';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/usuario.model';
import { UsuarioService } from '../../core/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../shared/producto.model';
import { DetalleVenta } from '../../shared/venta-request.model';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent {

  idUsuario!: number; // Usuario seleccionado
  idProducto!: number; // Producto seleccionado
  cantidad!: number; // Cantidad del producto
  precioUnitario!: number; // Precio unitario del producto
  detalles: DetalleVenta[] = [];
  totalPago = 0;
  usuarios: Usuario[] = []; // Lista de usuarios activos
  productos: Producto[] = []; // Lista de productos disponibles

  constructor(
    private ventaService: VentaService,
    private usuarioService: UsuarioService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarProductos();
    console.log('Usuarios:', this.usuarios);
    console.log('Productos:', this.productos);
  }
  

  cargarUsuarios(): void {
    this.usuarioService.listarUsuariosActivos().subscribe({
      next: (usuarios) => (this.usuarios = usuarios),
      error: () =>
        Swal.fire('Error', 'Error al cargar usuarios. Inténtelo de nuevo.', 'error')
    });
  }

  onProductoChange(event: any): void {
    console.log('Producto seleccionado:', this.idProducto, 'Evento:', event.target.value);
  }
  

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        console.log('Productos cargados:', this.productos);
      },
      error: () =>
        Swal.fire('Error', 'Error al cargar productos. Inténtelo de nuevo.', 'error')
    });
  }
  

  agregarDetalle(): void {
    // Validar los campos antes de agregar al detalle
    if (!this.idProducto || !this.cantidad || !this.precioUnitario || this.cantidad <= 0 || this.precioUnitario <= 0) {
      Swal.fire('Advertencia', 'Por favor, complete todos los campos del producto con valores válidos.', 'warning');
      return;
    }
  
    // Buscar el producto seleccionado
    const productoSeleccionado = this.productos.find(p => p.idProducto === +this.idProducto);
    if (!productoSeleccionado) {
      Swal.fire('Error', 'Producto no válido.', 'error');
      return;
    }
  
    // Crear el detalle del producto
    const detalle: DetalleVenta = {
      producto: productoSeleccionado,
      cantidad: this.cantidad,
      precioUnitario: this.precioUnitario
    };
  
    // Agregar el detalle y recalcular el total
    this.detalles.push(detalle);
    this.actualizarTotal();
  
    // Reset campos del formulario de producto
    this.idProducto = 0;
    this.cantidad = 0;
    this.precioUnitario = 0;
  
    // Mostrar mensaje de éxito
    Swal.fire('Éxito', 'Producto agregado al detalle.', 'success');
  }

  actualizarTotal(): void {
    this.totalPago = this.detalles.reduce((total, detalle) => total + (detalle.cantidad * detalle.precioUnitario), 0);
  }
  

  eliminarDetalle(index: number): void {
    // Eliminar el detalle seleccionado
    this.detalles.splice(index, 1);
  
    // Recalcular el total
    this.actualizarTotal();
  
    // Mostrar mensaje de éxito
    Swal.fire('Éxito', 'Producto eliminado del detalle.', 'success');
  }
  

  registrarVenta(): void {
    if (!this.idUsuario) {
      Swal.fire('Advertencia', 'Por favor, seleccione un usuario.', 'warning');
      return;
    }

    if (this.detalles.length === 0) {
      Swal.fire('Advertencia', 'Debe agregar al menos un producto.', 'warning');
      return;
    }

    const venta: VentaRequest = {
      idUsuario: this.idUsuario,
      detalles: this.detalles
    };

    this.ventaService.registrarVenta(venta).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Venta registrada exitosamente.', 'success');
        this.detalles = [];
        this.totalPago = 0;
        this.idUsuario = 0;
      },
      error: () =>
        Swal.fire('Error', 'Error al registrar la venta. Inténtelo de nuevo.', 'error')
    });
  }

}
