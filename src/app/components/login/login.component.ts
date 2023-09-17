import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['', Validators.required],
    });
  }

  submit(loginForm: FormGroup) {
    this.http.get<any>('http://localhost:3000/users').subscribe((response) => {
      const user = response.find((user: any) => {
        return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password
      });
      // localStorage.setItem('token', response.token);
      if (user) {
        alert('Login successful');
        this.loginForm.reset();
        this.router.navigate(['home']);
      }
    });
  }

}
