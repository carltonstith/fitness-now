import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  registerUser() {
    this.http.post<any>('http://localhost:3000/users', this.registrationForm.value).subscribe((response) => {
      this.router.navigate(['/login']);
    });
  }

}
