import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogIn(loginForm: FormGroup) {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      //Send the obj to the database
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            // alert(res.message)
            console.log(res);
            this.loginForm.reset();
            this.router.navigate(['home']);
          },
          error: (err) => {
            alert(err?.error.message)
          }
        })
    }
    // this.http.get<any>('http://localhost:3000/users').subscribe((response) => {
    //   const user = response.find((user: any) => {
    //     return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password
    //   });
    //   // localStorage.setItem('token', response.token);
    //   if (user) {
    //     alert('Login successful');
    //     this.loginForm.reset();
    //     this.router.navigate(['home']);
    //   }
    // });
  }

}
