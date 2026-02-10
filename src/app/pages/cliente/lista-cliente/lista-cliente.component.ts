import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-cliente',
  standalone: true,
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css'],
  imports: [CommonModule, FormsModule]
})

export class ListaClienteComponent implements OnInit {
  filtro: string = '';
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clienteSeleccionadoId: number | null = null;


  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

ngOnInit(): void {
  this.obtenerClientes();
}

  obtenerClientes(): void {
  this.clienteService.getClientes().subscribe({
    next: (response) => {
      if (response.success) {
        this.clientes = response.data;
        this.clientesFiltrados = response.data;
      } else {
        alert(response.message);
      }
    },
    error: (err) => {
      console.error('❌ Error al obtener clientes', err);
    }
  });
}


  filtrarClientes(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c =>
      c.nombres.toLowerCase().includes(filtroLower)
    );
  }


  registrarCliente(): void {
    this.router.navigate(['/cliente/registrar']);
  }

  editarCliente(id: number): void {
    this.router.navigate(['/cliente/actualizar', id]);
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe(() => {
        this.obtenerClientes();
      });
    }
  }

  seleccionarCliente(id: number): void {
    this.clienteSeleccionadoId = id;
  }

}
