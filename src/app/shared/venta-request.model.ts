// venta-request.model.ts
import { Producto } from '../shared/producto.model';
export interface DetalleVenta {
  producto: Producto; // Producto completo
  cantidad: number;
  precioUnitario: number;
}


export interface VentaRequest {
  idUsuario: number;
  detalles: DetalleVenta[];
}


// producto.model.ts
// export interface Producto {
//   idProducto: number;
// }
