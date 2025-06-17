import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ColaboradorService } from '../../../../services/colaborador.service';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-colaborador',
  templateUrl: './edit-colaborador.component.html',
})
export class EditColaboradorComponent implements OnInit {
  @Input() colaboradorId!: number;
  colaboradorForm!: FormGroup;

  constructor(private fb: FormBuilder, private colaboradorService: ColaboradorService,
              public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.colaboradorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: [''],
      edad: [''],
      profesion: [''],
      estadocivil: ['']
    });

    this.cargarColaborador();
  }

  cargarColaborador() {
    if (!this.colaboradorId) return;

    this.colaboradorService.getColaboradorById(this.colaboradorId).subscribe({
      next: (colaborador) => {
        this.colaboradorForm.patchValue({
          nombre: colaborador.NOMBRE,
          apellido: colaborador.APELLIDO,
          direccion: colaborador.DIRECCION,
          edad: colaborador.EDAD,
          profesion: colaborador.PROFESION,
          estadocivil: colaborador.ESTADOCIVIL
        });
      },
      error: () => {
        console.error('No se pudo cargar el colaborador');
      }
    });
  }

  guardarCambios() {
    if (this.colaboradorForm.invalid) {
      this.colaboradorForm.markAllAsTouched();
      return;
    }

    const datosActualizados = this.colaboradorForm.value;

    this.colaboradorService.actualizarColaborador(this.colaboradorId, datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Colaborador actualizado',
          text: 'Los datos fueron guardados correctamente',
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          this.activeModal.close(); // Cierra el modal
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el colaborador'
        });
      }
    });
  }
}
