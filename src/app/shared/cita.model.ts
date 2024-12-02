// export class Cita {
//   constructor(
//     public fecha: string,
//     public hora: string,
//     public nota: string,
//     public estado: string,
//     public cliente: { idUsuario: number }, // Asegúrate de que sea un objeto
//     public barbero: { idUsuario: number }   // Asegúrate de que sea un objeto
//   ) {}
// }
// cita.model.ts
export interface Cita {
  idCita?: number;
  fecha: string;  // Usaremos string para que coincida con el formato de fecha que Angular maneja fácilmente
  hora: string;
  idServicio: number;
  estado: string;
  idCliente: number;
  idBarbero: number;
}
