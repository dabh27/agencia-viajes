
export interface LoginRequest {
  correo: string;
  clave: string;
}


export interface UsuarioRespuesta {
  idUsuario?: number;
  nombre?: string;
  token?: string; 
  rol?: string;   
}