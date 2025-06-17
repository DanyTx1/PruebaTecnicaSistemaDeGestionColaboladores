import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Auth} from "../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  postLogin(user: string, password: string) {

    let auth: Auth = {
      username: user,
      password: password,
    };
    debugger
    return this.http.post(`${environment.urlBase}auth/login`, auth);
  }

}
