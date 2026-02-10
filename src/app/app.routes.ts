import { Routes } from '@angular/router';
import { HomeComponent } from './components/view/home/home.component';
import { LoginComponent } from './pages/login/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  // LOGIN (pública)
  { path: 'login', component: LoginComponent },

  // RUTAS PROTEGIDAS
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },

      {
        path: 'cliente',
        loadChildren: () => import('./pages/cliente/cliente.routes').then(m => m.ClienteRoutes)
      },

      {
        path: 'reservas',
        loadChildren: () => import('./pages/reserva/reserva.routes').then(m => m.RESERVA_ROUTES)
      },

      {
        path: 'pagos',
        loadChildren: () => import('./pages/pagos/pagos.routes').then(m => m.PAGOS_ROUTES)
      },

      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];