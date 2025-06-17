import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Colaborador} from "../interfaces/colaborador";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private http: HttpClient) { }

  getColaboradoresTable(requestParams: any): Observable<any> {
    return this.http.post<any>(`${environment.urlBase}colaborador/datatables`, requestParams);
  }

  crearColaborador(colaborador: any): Observable<any> {
    debugger
    return this.http.post(`${environment.urlBase}colaborador`, colaborador);
  }

  getColaboradorById(id: number): Observable<any> {
    return this.http.get(`${environment.urlBase}colaborador/${id}`);
  }

  actualizarColaborador(id: number, datos: any): Observable<any> {
    return this.http.put(`${environment.urlBase}colaborador/${id}`, datos);
  }

  eliminarColaborador(id: number): Observable<any> {
    return this.http.delete(`${environment.urlBase}colaborador/${id}`);
  }


}
