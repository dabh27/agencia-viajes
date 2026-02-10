import { Routes } from '@angular/router';
import { RegistrarFacturaComponent } from './registrar-factura/registrar-factura.component';
import { ListaFacturaComponent } from './lista-facturas/lista-facturas.component';


export const PAGOS_ROUTES: Routes = [
  { path: '', component: ListaFacturaComponent }, // Ruta por defecto (Listado)
  { path: 'generar', component: RegistrarFacturaComponent } // Ruta para cobrar
];