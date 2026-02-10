import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

// Servicios
import { ClienteService } from '../../../services/cliente.service';

// Modelos
import { ReservaListar } from '../../../models/reserva.model';
import { Cliente } from '../../../models/cliente.models';
import { FacturaListar } from '../../../models/factura.models';
import { ReservaService } from '../../../services/reservas.service';
import { FacturaService } from '../../../services/facturas.service';


@Component({
  selector: 'app-historialcliente-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './historialcliente-reserva.component.html',
  styleUrls: ['./historialcliente-reserva.component.css']
})
export class HistorialclienteReservaComponent implements OnInit {

  // Datos Originales (Caché)
  listaClientes: Cliente[] = [];
  todasLasReservas: ReservaListar[] = [];
  todasLasFacturas: FacturaListar[] = [];

  // Datos Filtrados
  idClienteSeleccionado: number | string = "";
  reservasFiltradas: ReservaListar[] = [];
  facturasFiltradas: FacturaListar[] = []; 

  // Totales
  totalGastoReservas: number = 0;
  totalPagadoFacturas: number = 0; 
  
  cargando: boolean = false;
  
  // Control de Pestañas (Reservas vs Facturas)
  vistaActual: 'reservas' | 'facturas' = 'reservas';

  constructor(
    private clienteService: ClienteService,
    private reservaService: ReservaService,
    private facturaService: FacturaService 
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;

    // 1. Cargar Clientes
    this.clienteService.getClientes().subscribe(resp => {
      if(resp.success) this.listaClientes = resp.data;
    });

    // 2. Cargar Reservas
    this.reservaService.getReservas().subscribe({
      next: (resp) => {
        if(resp.success) this.todasLasReservas = resp.data;
      }
    });

    // 3. Cargar Facturas 
    this.facturaService.getFacturas().subscribe({
      next: (resp) => {
        if(resp.success) this.todasLasFacturas = resp.data;
        this.cargando = false; 
      },
      error: () => this.cargando = false
    });
  }

  filtrarHistorial() {
  
    if (this.idClienteSeleccionado === "") {
      this.reservasFiltradas = [];
      this.facturasFiltradas = [];
      this.totalGastoReservas = 0;
      this.totalPagadoFacturas = 0;
      return;
    }

    const clienteObj = this.listaClientes.find(c => c.idCliente == Number(this.idClienteSeleccionado));
    
    if (clienteObj) {
    
      this.reservasFiltradas = this.todasLasReservas.filter(r => 
        r.cliente.toLowerCase().includes(clienteObj.nombres.toLowerCase()) || 
        r.cliente.toLowerCase().includes(clienteObj.apellidos.toLowerCase())
      );

     
      this.facturasFiltradas = this.todasLasFacturas.filter(f => 
        f.cliente.toLowerCase().includes(clienteObj.nombres.toLowerCase()) || 
        f.cliente.toLowerCase().includes(clienteObj.apellidos.toLowerCase())
      );

      this.calcularTotales();
    }
  }

  calcularTotales() {
 
    this.totalGastoReservas = this.reservasFiltradas
        .filter(r => r.activo) 
        .reduce((acc, curr) => acc + curr.precio, 0);

    
    this.totalPagadoFacturas = this.facturasFiltradas
        .filter(f => f.activo)
        .reduce((acc, curr) => acc + curr.montoTotal, 0);
  }

  cambiarVista(vista: 'reservas' | 'facturas') {
    this.vistaActual = vista;
  }
}