import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:5256/api/User/';
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}authenticate`, loginObj);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['authentication/login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  // this is no longer working as canActivate has been deprecated
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // this uses a functional guard
  // isLoggedIn() {
  //   return of(false).pipe(
  //     tap(() => !!localStorage.getItem('token'))
  //   )
  // }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(`decodedToken: ${token}`);
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }

  getRolesFromToken() {
    if (this.userPayload) {
      return this.userPayload.roles;
    }
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(
      `${this.baseUrl}refresh`,
      tokenApi
    );
  }
}
