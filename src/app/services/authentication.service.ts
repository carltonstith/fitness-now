import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:5256/api/User/';

  constructor(private http: HttpClient, private router: Router) { }

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}authenticate`, loginObj);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
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
}
