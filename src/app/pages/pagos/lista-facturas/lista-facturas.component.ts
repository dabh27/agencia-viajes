import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ReservaListar } from '../../../models/reserva.model';

import { VerFacturaComponent } from '../ver-factura/ver-factura.component';
import { FacturaListar } from '../../../models/factura.models';
import { FacturaService } from '../../../services/facturas.service';
import { ReservaService } from '../../../services/reservas.service';

@Component({
  selector: 'app-lista-factura',
  standalone: true,
  imports: [CommonModule, RouterModule, VerFacturaComponent],
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturaComponent implements OnInit {

  // --- FUENTES DE DATOS ---
  listaFacturas: FacturaListar[] = [];   
  listaPendientes: ReservaListar[] = []; 

  // --- VISTA ACTUAL ---
  vistaActual: string = 'pendientes'; 
  
  // Datos filtrados para la tabla de historial
  facturasMostradas: FacturaListar[] = [];

  cargando: boolean = true;
  error: string | null = null;

  // --- CONTROL DEL MODAL DE FACTURA (NUEVO) ---
  facturaSeleccionada: FacturaListar | null = null;
  mostrarModalFactura: boolean = false;

  constructor(
    private facturaService: FacturaService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    
    // 1. Cargar Historial de Facturas
    this.facturaService.getFacturas().subscribe({
      next: (resp) => {
        if (resp.success) {
          this.listaFacturas = resp.data;
          this.filtrarHistorial(); 
        }
        
      },
      error: () => this.cargando = false
    });

    // 2. Cargar Cuentas por Cobrar (Reservas Activas NO facturadas)
    this.reservaService.getReservas().subscribe({
      next: (resp) => {
        if (resp.success) {
          this.listaPendientes = resp.data.filter(r => r.activo && !r.yaFacturada);
        }
        this.cargando = false; 
      },
      error: () => this.cargando = false
    });
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
    if (vista !== 'pendientes') {
      this.filtrarHistorial();
    }
  }

  filtrarHistorial() {
    if (this.vistaActual === 'emitidas') {
      this.facturasMostradas = this.listaFacturas.filter(f => f.activo);
    } else if (this.vistaActual === 'anuladas') {
      this.facturasMostradas = this.listaFacturas.filter(f => !f.activo);
    }
  }

  // --- ACCIÓN RÁPIDA: COBRAR ---
  irAFacturar(idReserva: number) {
    this.router.navigate(['/pagos/generar'], { queryParams: { reserva: idReserva } });
  }

  // --- ACCIÓN: VER FACTURA (NUEVO) ---
  verFactura(factura: FacturaListar) {
    this.facturaSeleccionada = factura;
    this.mostrarModalFactura = true;
  }

  cerrarModal() {
    this.mostrarModalFactura = false;
    this.facturaSeleccionada = null;
  }

  // --- ACCIÓN: ANULAR ---
  anular(id: number) {
    if(!confirm('⚠️ ¿Está seguro de ANULAR esta factura?\nEsta acción afecta los reportes contables.')) return;

    this.facturaService.anularFactura(id).subscribe(resp => {
      if(resp.success) {
        alert('Factura anulada correctamente');
        this.cargarDatos(); 
      } else {
        alert(resp.message);
      }
    });
  }
}