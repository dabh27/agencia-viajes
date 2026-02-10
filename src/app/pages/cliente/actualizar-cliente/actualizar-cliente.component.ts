import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ActualizarClienteComponent implements OnInit {

  clienteForm!: FormGroup;
  idCliente!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.idCliente = Number(this.route.snapshot.paramMap.get('id'));

  this.clienteForm = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    cedula: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
  });

    this.cargarCliente();
  }

  cargarCliente(): void {
    this.clienteService.getCliente(this.idCliente).subscribe(resp => {
      if (resp.success) {
        this.clienteForm.patchValue(resp.data);
      } else {
        alert(resp.message);
      }
    });
  }

  actualizar(): void {
    if (this.clienteForm.valid) {

      const cliente = {
        idCliente: this.idCliente,
        ...this.clienteForm.value
      };

      this.clienteService.actualizarCliente(cliente).subscribe(resp => {
        if (resp.success) {
          this.router.navigate(['/cliente/lista']);
        } else {
          alert(resp.message);
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/cliente/lista']);
  }



}
