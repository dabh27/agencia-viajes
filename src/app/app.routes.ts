import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { HomeComponent } from './pages/home/home.component';
import { DetalleDestinoComponent } from './pages/detalle-destino/detalle-destino.component';
import { DestinosComponent } from './pages/destinos/destinos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'destinos', component: DestinosComponent },
    { path: 'destino/:id', component: DetalleDestinoComponent },
    { path: 'reserva/:id', component: ReservaComponent },
    { path: 'login', component: LoginComponent },
];
