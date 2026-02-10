import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para ngModel
import { RouterModule } from '@angular/router';
import { ReservaListar } from '../../../models/reserva.model';
import { Cliente } from '../../../models/cliente.models';
import { ClienteService } from '../../../services/cliente.service';
import { ReservaService } from '../../../services/reservas.service';


@Component({
  selector: 'app-historialcliente-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './historialcliente-reserva.component.html',
  styleUrls: ['./historialcliente-reserva.component.css']
})
export class HistorialclienteReservaComponent implements OnInit {

  // Datos Originales
  listaClientes: Cliente[] = [];
  todasLasReservas: ReservaListar[] = [];

  // Datos Filtrados
  reservasFiltradas: ReservaListar[] = [];
  idClienteSeleccionado: number | string = "";

  // Totales
  totalGasto: number = 0;
  totalReservas: number = 0;
  
  cargando: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;

  
    this.clienteService.getClientes().subscribe(resp => {
      if(resp.success) this.listaClientes = resp.data;
    });

    this.reservaService.getReservas().subscribe({
      next: (resp) => {
        if(resp.success) {
          this.todasLasReservas = resp.data;
        }
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }


  filtrarHistorial() {
    if (this.idClienteSeleccionado === "") {
      this.reservasFiltradas = [];
      this.totalGasto = 0;
      this.totalReservas = 0;
      return;
    }

   
    const clienteObj = this.listaClientes.find(c => c.idCliente == Number(this.idClienteSeleccionado));
    
    if (clienteObj) {
      const nombreCompleto = `${clienteObj.nombres} ${clienteObj.apellidos}`;

      this.reservasFiltradas = this.todasLasReservas.filter(r => 
       
        r.cliente.toLowerCase().includes(clienteObj.nombres.toLowerCase()) || 
        r.cliente.toLowerCase().includes(clienteObj.apellidos.toLowerCase())
      );

      this.calcularTotales();
    }
  }

  calcularTotales() {
    this.totalReservas = this.reservasFiltradas.length;
    this.totalGasto = this.reservasFiltradas.reduce((acc, curr) => acc + curr.precio, 0);
  }
}