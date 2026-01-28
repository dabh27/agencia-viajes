export interface Reserva {
  idReserva: number;
  codigoReserva: string;
  idCliente: number;        
  idTipoPasajero: number;
  idTipoPasaje: number;
  idCiudadOrigen: number;   
  idCiudadDestino: number;  
  fechaIda: string;         
  fechaVuelta: string;      
  cantidadPasajes: number;
  precio: number;
  activo: boolean;
}