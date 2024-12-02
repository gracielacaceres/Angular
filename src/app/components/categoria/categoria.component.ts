import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import Swal from 'sweetalert2';

interface Categoria {
  idCategoria?: number;
  nombre: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias: Categoria[] = [];
  newCategoria: Categoria = { nombre: '' };
  editingCategoria: Categoria | null = null;
  editingCategoriaNombre: string = '';


  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.getAllCategorias();
  }



  getAllCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        Swal.fire('Error', 'No se pudo cargar las categorías', 'error');
      }
    );
  }

  addCategoria(): void {
    if (!this.newCategoria.nombre) {
      Swal.fire('Advertencia', 'El nombre de la categoría es obligatorio', 'warning');
      return;
    }

    this.categoriaService.createCategoria(this.newCategoria).subscribe(
      (data) => {
        this.categorias.push(data);
        Swal.fire('Creado', 'Categoría creada correctamente', 'success');
        this.newCategoria = { nombre: '' };
      },
      (error) => {
        Swal.fire('Error', 'No se pudo crear la categoría', 'error');
      }
    );
  }

  editCategoria(categoria: Categoria): void {
    this.editingCategoria = { ...categoria };
    this.editingCategoriaNombre = this.editingCategoria.nombre;
  }


  updateCategoria(): void {
    if (this.editingCategoria && this.editingCategoriaNombre.trim() !== '') {
      this.editingCategoria.nombre = this.editingCategoriaNombre;

      this.categoriaService.updateCategoria(this.editingCategoria.idCategoria!, this.editingCategoria).subscribe(
        (data) => {
          const index = this.categorias.findIndex(c => c.idCategoria === data.idCategoria);
          if (index !== -1) this.categorias[index] = data;
          Swal.fire('Actualizado', 'Categoría actualizada correctamente', 'success');
          this.editingCategoria = null;
          this.editingCategoriaNombre = '';
        },
        (error) => {
          Swal.fire('Error', 'No se pudo actualizar la categoría', 'error');
        }
      );
    } else {
      Swal.fire('Advertencia', 'El nombre de la categoría es obligatorio', 'warning');
    }
  }



  deleteCategoria(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(id).subscribe(
          () => {
            this.categorias = this.categorias.filter(c => c.idCategoria !== id);
            Swal.fire('Eliminado', 'Categoría eliminada correctamente', 'success');
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
          }
        );
      }
    });
  }

  cancelEdit(): void {
    this.editingCategoria = null;
  }
}
