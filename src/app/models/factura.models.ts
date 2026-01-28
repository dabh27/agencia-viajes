export interface Factura {
  idCliente: number;
  idReserva: number;
  idMetodoPago: number;
  idFactura?: number;
  fechaEmision?: string;
  montoTotal?: number;
}