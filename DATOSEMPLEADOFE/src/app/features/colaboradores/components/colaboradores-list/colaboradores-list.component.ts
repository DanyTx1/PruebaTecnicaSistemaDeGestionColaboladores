import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {ColaboradorService} from "../../../../services/colaborador.service";
import {Colaborador} from "../../../../interfaces/colaborador";
import $ from 'jquery';
import 'datatables.net-bs5';
import Swal from "sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NgZone } from '@angular/core';
import {EditColaboradorComponent} from "../edit-colaborador/edit-colaborador.component";

@Component({
  selector: 'app-colaboradores-list',
  templateUrl: './colaboradores-list.component.html',
  styleUrl: './colaboradores-list.component.css'
})
export class ColaboradoresListComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  constructor(private serviceAuth: AuthService, private colaboradorService: ColaboradorService,
              private modalService: NgbModal, private ngZone: NgZone,) {
  }

  ngOnInit(): void {
    $('#tablaColaboradores').DataTable({
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.colaboradorService.getColaboradoresTable(dataTablesParameters)
          .subscribe(response => {
            callback({
              draw: dataTablesParameters.draw,
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsFiltered,
              data: response.data
            });
          });
      },
      columns: [
        { data: 'IDCOLABORADOR' },
        { data: 'NOMBRE' },
        { data: 'APELLIDO' },
        { data: 'DIRECCION' },
        { data: 'EDAD' },
        { data: 'PROFESION' },
        { data: 'ESTADOCIVIL' },
        {
          data: null,
          orderable: false,
          render: (data: any, type: any, row: any) => {
            return `<button class="btn btn-outline-dark btn-sm btn-riesgo" data-edad="${row.EDAD}">
                    Ver Riesgo
                  </button>
                  <button class="btn btn-outline-dark btn-sm btn-editar" data-id="${row.IDCOLABORADOR}">
                  Editar
                  </button>
                  <button class="btn btn-outline-danger btn-sm btn-eliminar" data-id="${row.IDCOLABORADOR}">
                   Eliminar
                  </button>
        `;}
        }
      ],
      pagingType: 'full_numbers',
      pageLength: 5
    });


    $('#tablaColaboradores tbody').on('click', '.btn-riesgo', function () {
      const edad = parseInt($(this).data('edad'), 10);
      let mensaje = '';

      if (edad >= 18 && edad <= 25) {
        mensaje = 'FUERA DE PELIGRO';
      } else if (edad >= 26 && edad <= 50) {
        mensaje = 'TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENCIÓN';
      } else if (edad >= 51) {
        mensaje = 'POR FAVOR QUÉDESE EN CASA';
      } else {
        mensaje = 'Edad no válida';
      }
      Swal.fire({
        title: 'Nivel de Riesgo',
        text: mensaje,
        icon: 'info'
      });
    });

    $('#tablaColaboradores tbody').on('click', '.btn-editar', (event) => {
      const id = $(event.currentTarget).data('id');

      // Ejecutar dentro de Angular para evitar errores de zona
      this.ngZone.run(() => {
        const modalRef = this.modalService.open(EditColaboradorComponent, {
          centered: true,
          size: 'lg'
        });

        // Pasa el ID al componente modal
        modalRef.componentInstance.colaboradorId = id;

        modalRef.closed.subscribe(() => {
          this.recargarTabla();
        });
      });
    });

    $('#tablaColaboradores tbody').on('click', '.btn-eliminar', (event) => {
      const id = $(event.currentTarget).data('id');

      this.ngZone.run(() => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción no se puede deshacer',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33'
        }).then((result) => {
          if (result.isConfirmed) {
            this.colaboradorService.eliminarColaborador(id).subscribe({
              next: () => {
                Swal.fire('Eliminado', 'El colaborador fue eliminado exitosamente', 'success');
                this.recargarTabla();
              },
              error: () => {
                Swal.fire('Error', 'No se pudo eliminar el colaborador', 'error');
              }
            });
          }
        });
      });
    });
  }

  recargarTabla() {
    // Busca la instancia de DataTables y recarga
    // @ts-ignore
    $('#tablaColaboradores').DataTable().ajax.reload(null, false);
  }

}
