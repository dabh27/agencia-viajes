import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
})

export class RegistrarClienteComponent {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required], // ✅ Asegúrate que esto está presente
      cedula: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });

  }

  registrar(): void {
    if (this.clienteForm.valid) {
      this.clienteService.crearCliente(this.clienteForm.value).subscribe(() => {
        this.router.navigate(['/cliente/lista']);
      });
    }
  }

  volver(): void {
    this.router.navigate(['/cliente/lista']);
  }

}
