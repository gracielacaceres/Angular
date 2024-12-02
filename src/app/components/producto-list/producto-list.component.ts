import { Component, OnInit } from '@angular/core';
import { Producto } from '../../shared/producto.model';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    // Cargar los productos cuando se inicializa el componente
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  cargarProductos(filtro: string): void {
    if (filtro === 'activos') {
      this.productoService.listarProductosActivos().subscribe((data: Producto[]) => {
        this.productos = data;
      });
    } else if (filtro === 'inactivos') {
      this.productoService.listarProductosInactivos().subscribe((data: Producto[]) => {
        this.productos = data;
      });
    } else {
      this.productoService.listarProductos().subscribe((data: Producto[]) => {
        this.productos = data;
      });
    }
  }

  filtrarProductos(filtro: string): void {
    this.cargarProductos(filtro); // Filtrar los productos según el botón seleccionado
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }
  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id).subscribe(() => {
      this.obtenerProductos();  // Actualiza la lista después de eliminar
    });
  }

  restaurarProducto(id: number): void {
    this.productoService.restaurarProducto(id).subscribe(() => {
      this.obtenerProductos();  // Actualiza la lista después de restaurar
    });
  }

 
}
