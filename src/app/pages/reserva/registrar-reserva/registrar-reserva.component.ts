import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente.models';
import { CatalogoService } from '../../../services/catalogo.service';
import { ClienteService } from '../../../services/cliente.service';
import { ReservaService } from '../../../services/reservas.service';
import { Reserva } from '../../../models/reserva.model';



@Component({
  selector: 'app-registrar-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registrar-reserva.component.html',
  styleUrls: ['./registrar-reserva.component.css']
})
export class RegistrarReservaComponent implements OnInit {

  formReserva: FormGroup;
  enviando: boolean = false;
  error: string | null = null;

  // --- Listas Dinámicas  ---
  listaClientes: Cliente[] = [];
  listaCiudades: any[] = [];
  listaTipoPasajero: any[] = [];
  listaTipoPasaje: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private catalogoService: CatalogoService, 
    private router: Router
  ) {
    this.formReserva = this.fb.group({
      codigoReserva: ['RES-' + Math.floor(1000 + Math.random() * 9000), Validators.required],
      idCliente: ['', Validators.required],
      idTipoPasajero: ['', Validators.required],
      idTipoPasaje: ['', Validators.required],
      idCiudadOrigen: ['', Validators.required],
      idCiudadDestino: ['', Validators.required],
      fechaIda: ['', Validators.required],
      fechaVuelta: [null],
      cantidadPasajes: [1, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  cargarCatalogos() {
    // 1. Clientes
    this.clienteService.getClientes().subscribe(resp => {
      if (resp.success) this.listaClientes = resp.data;
    });

    // 2. Ciudades (SQL)
    this.catalogoService.getCiudades().subscribe(resp => {
      if (resp.success) this.listaCiudades = resp.data;
    });

    // 3. Tipos Pasajero (SQL)
    this.catalogoService.getTiposPasajero().subscribe(resp => {
      if (resp.success) this.listaTipoPasajero = resp.data;
    });

    // 4. Tipos Pasaje (SQL)
    this.catalogoService.getTiposPasaje().subscribe(resp => {
      if (resp.success) this.listaTipoPasaje = resp.data;
    });
  }

  guardar() {
    if (this.formReserva.invalid) {
      this.formReserva.markAllAsTouched();
      return;
    }
    const origen = this.formReserva.get('idCiudadOrigen')?.value;
    const destino = this.formReserva.get('idCiudadDestino')?.value;

    if (origen == destino) {
      this.error = 'La ciudad de origen y destino no pueden ser la misma.';
      return;
    }

    this.enviando = true;
    this.error = null;

    
    const nuevaReserva: Reserva = {
      idReserva: 0,
      ...this.formReserva.value
    };

    // Aseguramos conversión a números
    nuevaReserva.idCliente = Number(nuevaReserva.idCliente);
    nuevaReserva.idTipoPasajero = Number(nuevaReserva.idTipoPasajero);
    nuevaReserva.idTipoPasaje = Number(nuevaReserva.idTipoPasaje);
    nuevaReserva.idCiudadOrigen = Number(nuevaReserva.idCiudadOrigen);
    nuevaReserva.idCiudadDestino = Number(nuevaReserva.idCiudadDestino);

    this.reservaService.crearReserva(nuevaReserva).subscribe({
      next: (resp) => {
        if (resp.success) {
          alert('✅ Reserva creada con éxito');
          this.router.navigate(['/reservas']);
        } else {
          this.error = resp.message || 'Error al guardar';
        }
        this.enviando = false;
      },
      error: () => {
        this.error = 'Error de conexión con el servidor';
        this.enviando = false;
      }
    });
  }
}