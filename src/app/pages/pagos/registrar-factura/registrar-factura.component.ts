import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 

import { CatalogoService } from '../../../services/catalogo.service';
import { ReservaListar } from '../../../models/reserva.model';
import { FacturaService } from '../../../services/facturas.service';
import { ReservaService } from '../../../services/reservas.service';

@Component({
  selector: 'app-registrar-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css']
})
export class RegistrarFacturaComponent implements OnInit {

  formFactura: FormGroup;
  enviando: boolean = false;
  error: string | null = null;

  listaReservasPendientes: ReservaListar[] = [];
  listaMetodosPago: any[] = [];
  reservaSeleccionada: ReservaListar | null = null;

  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaService,
    private reservaService: ReservaService,
    private catalogoService: CatalogoService,
    private router: Router,
    private route: ActivatedRoute // ✅ Inyección
  ) {
    this.formFactura = this.fb.group({
      idReserva: ['', Validators.required],
      idMetodoPago: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    // 1. Cargar Métodos de Pago
    this.catalogoService.getMetodosPago().subscribe(resp => {
      if(resp.success) this.listaMetodosPago = resp.data;
    });

    // 2. Cargar Reservas Pendientes
    this.reservaService.getReservas().subscribe({
      next: (resp) => {
        if (resp.success) {
      
          this.listaReservasPendientes = resp.data.filter(r => r.activo && !r.yaFacturada);
        
          this.verificarParametrosURL();
        }
      }
    });
  }

  verificarParametrosURL() {
    this.route.queryParams.subscribe(params => {
      const idReservaUrl = params['reserva'];
      if (idReservaUrl) {
        
        this.formFactura.patchValue({ idReserva: idReservaUrl });
       
        this.seleccionarReserva();
      }
    });
  }

  seleccionarReserva() {
    const id = Number(this.formFactura.get('idReserva')?.value);
    this.reservaSeleccionada = this.listaReservasPendientes.find(r => r.idReserva == id) || null;
  }

  guardar() {
    if (this.formFactura.invalid) {
      this.formFactura.markAllAsTouched();
      return;
    }

    if (!this.reservaSeleccionada) return;

    this.enviando = true;
    this.error = null;

    // Buscamos el detalle completo para obtener el ID Cliente real
    this.reservaService.getReserva(this.reservaSeleccionada.idReserva).subscribe({
      next: (reservaFull) => {
        if(reservaFull.success) {
          
          const nuevaFactura = {
            idReserva: this.reservaSeleccionada!.idReserva,
            idCliente: reservaFull.data.idCliente,
            idMetodoPago: Number(this.formFactura.get('idMetodoPago')?.value)
          };

          this.facturaService.crearFactura(nuevaFactura).subscribe({
            next: (resp) => {
              if (resp.success) {
                alert('✅ ¡Pago registrado con éxito!');
                this.router.navigate(['/pagos']);
              } else {
                this.error = resp.message;
              }
              this.enviando = false;
            },
            error: () => {
              this.error = "Error al procesar la factura.";
              this.enviando = false;
            }
          });
        }
      },
      error: () => {
        this.error = "Error validando datos del cliente.";
        this.enviando = false;
      }
    });
  }
}