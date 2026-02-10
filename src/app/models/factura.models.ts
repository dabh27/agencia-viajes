export interface Factura {
    idFactura: number;
    numeroFactura: string;
    idCliente: number;
    idReserva: number;
    idMetodoPago: number;
    fechaEmision: string;
    montoTotal: number;
    activo: boolean;
}

export interface FacturaListar {
    idFactura: number;
    numeroFactura: string;
    cliente: string;
    ruta: string;
    fechaEmision: string;
    montoTotal: number;
    activo: boolean;
}

export interface CreateFactura {
    idCliente: number;
    idReserva: number;
    idMetodoPago: number;
}