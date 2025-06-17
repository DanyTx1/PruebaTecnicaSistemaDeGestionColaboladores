import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Output, EventEmitter } from '@angular/core';
import {ColaboradorService} from "../../../../services/colaborador.service";

@Component({
  selector: 'app-nuevo-colaborador',
  templateUrl: './nuevo-colaborador.component.html',
})
export class NuevoColaboradorComponent implements OnInit {
  colaboradorForm!: FormGroup;

  constructor(
    private fb: FormBuilder, private serviceAuth: ColaboradorService) {}

  ngOnInit(): void {
    this.colaboradorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: [''],
      edad: [''],
      profesion: [''],
      estadocivil: ['']
    });
  }

  @Output() colaboradorGuardado = new EventEmitter<void>();


  guardarColaborador() {
    if (this.colaboradorForm.invalid) {
      this.colaboradorForm.markAllAsTouched();
      return;
    }

    const nuevoColaborador = this.colaboradorForm.value;
    console.log(nuevoColaborador);

    this.serviceAuth.crearColaborador(nuevoColaborador).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Se agrego correctamente el colcaborador'
        });
        this.colaboradorForm.reset();
        this.colaboradorGuardado.emit();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          text: 'Ocurrio un error al registrar un nuevo colaborador intentelo mas tarde'
        });
      }
    });
  }
}
