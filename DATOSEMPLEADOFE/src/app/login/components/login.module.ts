import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {loginRoutes} from "./login.routes";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes),
    ReactiveFormsModule
  ]
})
export class LoginModule { }
