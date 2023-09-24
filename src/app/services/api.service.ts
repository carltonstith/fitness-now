import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5256/api/User/';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    // pass the token in the header
    const headers = {

    }
    return this.http.get<any>(`${this.baseUrl}`);
  }
}
