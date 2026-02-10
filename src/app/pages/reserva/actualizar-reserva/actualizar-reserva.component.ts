import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente.models';
import { ReservaService } from '../../../services/reservas.service';
import { ClienteService } from '../../../services/cliente.service';
import { CatalogoService } from '../../../services/catalogo.service';
import { Reserva } from '../../../models/reserva.model';



@Component({
  selector: 'app-actualizar-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './actualizar-reserva.component.html',
  styleUrls: ['./actualizar-reserva.component.css']
})
export class ActualizarReservaComponent implements OnInit {

  formReserva: FormGroup;
  idReserva: number = 0;
  cargando: boolean = true;
  enviando: boolean = false;
  error: string | null = null;


  listaClientes: Cliente[] = [];
  listaCiudades: any[] = [];
  listaTipoPasajero: any[] = [];
  listaTipoPasaje: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private catalogoService: CatalogoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formReserva = this.fb.group({
      codigoReserva: ['', Validators.required],
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
    this.idReserva = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    this.cargando = true;

 
    this.clienteService.getClientes().subscribe(r => { if(r.success) this.listaClientes = r.data; });
    this.catalogoService.getCiudades().subscribe(r => { if(r.success) this.listaCiudades = r.data; });
    this.catalogoService.getTiposPasajero().subscribe(r => { if(r.success) this.listaTipoPasajero = r.data; });
    
    
    this.catalogoService.getTiposPasaje().subscribe(r => {
      if(r.success) this.listaTipoPasaje = r.data;
      
  
      this.cargarReserva();
    });
  }

  cargarReserva() {
    this.reservaService.getReserva(this.idReserva).subscribe({
      next: (resp) => {
        if (resp.success) {
          const data = resp.data;
          this.formReserva.patchValue({
            codigoReserva: data.codigoReserva,
            idCliente: data.idCliente,
            idTipoPasajero: data.idTipoPasajero,
            idTipoPasaje: data.idTipoPasaje,
            idCiudadOrigen: data.idCiudadOrigen,
            idCiudadDestino: data.idCiudadDestino,
            cantidadPasajes: data.cantidadPasajes,
            precio: data.precio,
            activo: data.activo,
            fechaIda: this.formatearFecha(data.fechaIda),
            fechaVuelta: this.formatearFecha(data.fechaVuelta)
          });
        } else {
          this.error = 'No se encontró la reserva.';
        }
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error cargando la reserva.';
        this.cargando = false;
      }
    });
  }

  formatearFecha(fecha: string | undefined): string | null {
    if (!fecha) return null;
    return new Date(fecha).toISOString().slice(0, 16);
  }

  guardar() {
    if (this.formReserva.invalid) return;

    this.enviando = true;
    const reservaEditada: Reserva = {
      idReserva: this.idReserva,
      ...this.formReserva.value
    };

    // Conversión a números
    reservaEditada.idCliente = Number(reservaEditada.idCliente);
    reservaEditada.idTipoPasajero = Number(reservaEditada.idTipoPasajero);
    reservaEditada.idTipoPasaje = Number(reservaEditada.idTipoPasaje);
    reservaEditada.idCiudadOrigen = Number(reservaEditada.idCiudadOrigen);
    reservaEditada.idCiudadDestino = Number(reservaEditada.idCiudadDestino);

    this.reservaService.actualizarReserva(reservaEditada).subscribe({
      next: (resp) => {
        if (resp.success) {
          alert('✅ Actualización exitosa');
          this.router.navigate(['/reservas']);
        } else {
          alert('Error: ' + resp.message);
        }
        this.enviando = false;
      },
      error: () => {
        alert('Error en el servidor');
        this.enviando = false;
      }
    });
  }
}