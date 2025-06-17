import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private serviceAuth: AuthService,
              private router: Router) {

    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { user, password } = this.loginForm.value;

    this.serviceAuth.postLogin(user, password).subscribe({
      next: (request) => {
        // @ts-ignore
        localStorage.setItem('token', request['token']);
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          confirmButtonText: 'Continuar',
          customClass: {
            confirmButton: 'btn btn-outline-dark'
          },
          buttonsStyling: false
        });
        this.router.navigate(['/colaboradores']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Contraseña o usuario incorrectos',
          confirmButtonText: 'Volver a intentar',
          customClass: {
            confirmButton: 'btn btn-outline-danger'
          },
          buttonsStyling: false
        });
      }
    });
  }
}
