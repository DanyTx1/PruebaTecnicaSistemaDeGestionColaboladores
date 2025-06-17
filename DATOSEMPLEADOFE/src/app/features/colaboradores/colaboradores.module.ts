import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColaboradoresListComponent } from './components/colaboradores-list/colaboradores-list.component';
import { RouterModule } from '@angular/router';
import {colaboradoresRoutes} from "./colaboradores.routes";
import {NuevoColaboradorComponent} from "./components/nuevo-colaborador/nuevo-colaborador.component";
import {ReactiveFormsModule} from "@angular/forms";
import {EditColaboradorComponent} from "./components/edit-colaborador/edit-colaborador.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [

    EditColaboradorComponent,
    ColaboradoresListComponent,
    NuevoColaboradorComponent,

  ],

  imports: [

    NgbModule,
    CommonModule,
    RouterModule.forChild(colaboradoresRoutes),
    ReactiveFormsModule

  ],
})
export class ColaboradoresModule {}
