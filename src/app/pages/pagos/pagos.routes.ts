import { Routes } from '@angular/router';
import { ListaFacturasComponent } from './lista-facturas/lista-facturas.component';
import { EmitirFacturaComponent } from './emitir-factura/emitir-factura.component';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';

export const PAGOS_ROUTES: Routes = [
  { path: '', component: ListaFacturasComponent },
  { path: 'emitir', component: EmitirFacturaComponent },
  { path: 'detalle/:id', component: DetalleFacturaComponent },
];