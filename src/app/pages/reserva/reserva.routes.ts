import { Routes } from '@angular/router';
import { ListaReservaComponent } from './lista-reserva/lista-reserva.component';
import { RegistrarReservaComponent } from './registrar-reserva/registrar-reserva.component';
import { ActualizarReservaComponent } from './actualizar-reserva/actualizar-reserva.component';
import { HistorialclienteReservaComponent } from './historialcliente-reserva/historialcliente-reserva.component';

export const RESERVA_ROUTES: Routes = [
  { path: '', component: ListaReservaComponent },
  { path: 'registrar', component: RegistrarReservaComponent },
  { path: 'actualizar/:id', component: ActualizarReservaComponent },
  { path: 'historial', component: HistorialclienteReservaComponent },
];