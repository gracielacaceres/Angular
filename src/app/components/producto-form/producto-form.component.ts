import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../shared/producto.model';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent {
  producto: Producto = { // Definir el tipo de producto
    idProducto: 0,
    nombre: '',
    imagen: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    unidadMedida: '',
    fechaIngreso: new Date(),
    estado: 1,
    categoria: { idCategoria: 0, nombre: '' } // Inicializar la categoría
  };
  categorias: any[] = [];
  isEditMode: boolean = false;
  hoy: string = new Date().toISOString().split('T')[0]; // Fecha actual en formato 'YYYY-MM-DD'

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoriaService.getAllCategorias().subscribe(data => {
      this.categorias = data;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productoService.getProductos().subscribe(productos => {
        const productoEncontrado = productos.find((p: Producto) => p.idProducto === +id);
        if (productoEncontrado) {
          this.producto = productoEncontrado;
        } else {
          console.warn('Producto no encontrado con el ID especificado');
          // Opcional: maneja el caso en que el producto no sea encontrado (por ejemplo, redirigir al usuario)
        }
      });
    }

  }

  guardar(): void {
    if (this.isEditMode) {
      this.productoService.updateProducto(this.producto.idProducto, this.producto).subscribe(() => {
        alert('Producto actualizado con éxito');
        this.router.navigate(['/productos']);
      });
    } else {
      this.productoService.createProducto(this.producto).subscribe(() => {
        alert('Producto creado con éxito');
        this.router.navigate(['/productos']);
      });
    }
  }
}
