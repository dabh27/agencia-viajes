import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ⚠️ Importar esto para el Select
import { ReservaListar } from '../../../models/reserva.model';
import { ReservaService } from '../../../services/reservas.service';


@Component({
  selector: 'app-lista-reserva',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './lista-reserva.component.html',
  styleUrls: ['./lista-reserva.component.css']
})
export class ListaReservaComponent implements OnInit {

  todasLasReservas: ReservaListar[] = []; 
  reservasMostradas: ReservaListar[] = []; 
  
  cargando: boolean = true;
  error: string | null = null;
  filtroEstado: string = 'todos'; // Valor por defecto del select

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.cargando = true;
    this.reservaService.getReservas().subscribe({
      next: (resp) => {
        if (resp.success) {
          this.todasLasReservas = resp.data;
          this.aplicarFiltro(); 
        } else {
          this.error = resp.message || 'No se pudieron cargar las reservas';
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error de conexión con el servidor';
        this.cargando = false;
      }
    });
  }

  aplicarFiltro(): void {
    if (this.filtroEstado === 'todos') {
      this.reservasMostradas = this.todasLasReservas;
    } else if (this.filtroEstado === 'activos') {
      this.reservasMostradas = this.todasLasReservas.filter(r => r.activo);
    } else if (this.filtroEstado === 'inactivos') {
      this.reservasMostradas = this.todasLasReservas.filter(r => !r.activo);
    }
  }
  cambiarFiltro(estado: string) {
    this.filtroEstado = estado;
    this.aplicarFiltro(); 
  }

  eliminar(id: number): void {
    if (!confirm('¿Deseas cancelar esta reserva?')) return;

    this.reservaService.eliminarReserva(id).subscribe({
      next: (resp) => {
        if (resp.success) {
          this.cargarReservas(); 
        } else {
          alert('Error: ' + resp.message);
        }
      },
      error: () => alert('Error al intentar eliminar')
    });
  }
}