import { Routes } from '@angular/router';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';

export const CLIENTE_ROUTES: Routes = [
  { path: '', component: ListaClienteComponent },
  { path: 'nuevo', component: RegistrarClienteComponent },
  { path: 'detalle/:id', component: DetalleClienteComponent },
  { path: 'editar/:id', component: ActualizarClienteComponent },
];