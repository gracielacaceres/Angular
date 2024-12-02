import { Cita } from '../shared/cita.model';

export interface Pago {
  idPago: number;
  cita: Cita;
  corteRealizado: string;
  monto: number;
  fechaPago: string;
  horaPago: string;
  status: number;
}
