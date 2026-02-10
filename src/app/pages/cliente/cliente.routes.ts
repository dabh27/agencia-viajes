import { Routes } from '@angular/router';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';

export const ClienteRoutes: Routes = [
  { path: 'lista', component: ListaClienteComponent },
  { path: 'registrar', component: RegistrarClienteComponent },
  { path: 'actualizar/:id', component: ActualizarClienteComponent }
];
