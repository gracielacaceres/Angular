export interface Categoria {
  idCategoria: number;
  nombre: string;
}

export interface Producto {
  idProducto: number;
  imagen?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  unidadMedida: string;
  fechaIngreso: Date;
  fechaExpiracion?: Date;
  estado: number;
  categoria: Categoria; // Incluyendo la relación con la categoría
}
