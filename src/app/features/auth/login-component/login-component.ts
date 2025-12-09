import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LogoKia } from '../../../shared/components/logo-kia/logo-kia';
import { AuthService, IIniciarSesion } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})

export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const payload: IIniciarSesion = {
      email: this.form.value.email ?? '',
      contrasena: this.form.value.password ?? ''
    };

    this.authService.iniciarSesion(payload).subscribe({
      next: (respuesta) => {
        this.loading = false;

        if (respuesta?.estatus) {
          this.router.navigate(['/inicio/prepagado']);
        } else {
          this.error = respuesta?.resultadoOperacion || 'Credenciales inválidas.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Ocurrió un error al iniciar sesión. Intenta de nuevo.';
      },
    });
  }
}
