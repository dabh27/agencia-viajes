export interface Cliente {
  idCliente: number;
  nombres: string;
  apellidos: string; 
  cedula: string;
  telefono: string;
  correo: string;
  direccion: string;
  estado?: number;
  usuarioRegistro?: string;
  usuarioEliminacion?: string;
  fechaRegistro?: string; 
}
