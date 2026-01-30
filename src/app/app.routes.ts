import { Routes } from '@angular/router';
import { HomeComponent } from './components/view/home/home.component';
import { NotFoundComponent } from './components/view/not-found/not-found.component';


export const routes: Routes = [
  // Módulo: Autenticación 

  // Módulo: Clientes 
  { 
    path: 'clientes', 
    loadChildren: () => import('./pages/cliente/cliente.routes').then(m => m.CLIENTE_ROUTES) 
  },
  // Módulo: Reservas 
  { 
    path: 'reservas', 
    loadChildren: () => import('./pages/reserva/reserva.routes').then(m => m.RESERVA_ROUTES) 
  },
  // Módulo: Pagos/Facturas 
  { 
    path: 'pagos', 
    loadChildren: () => import('./pages/pagos/pagos.routes').then(m => m.PAGOS_ROUTES) 
  },

  // Vistas Generales
  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  
  // Redirecciones
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' }
];