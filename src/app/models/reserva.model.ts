// Modelo para CREAR, EDITAR y ver DETALLE 
export interface Reserva {
    idReserva: number;
    codigoReserva: string;
    idCliente: number;      
    idTipoPasajero: number;
    idTipoPasaje: number;
    idCiudadOrigen: number;
    idCiudadDestino: number;
    fechaIda: string;       
    fechaVuelta?: string;   
    cantidadPasajes: number;
    precio: number;
    activo: boolean;
}


export interface ReservaListar {
    idReserva: number;
    codigoReserva: string;
    cliente: string;        
    ruta: string;           
    fechaIda: string;
    fechaVuelta?: string;
    cantidadPasajes: number;
    precio: number;
    activo: boolean;
}