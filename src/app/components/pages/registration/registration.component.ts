import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm!: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registerUser(registrationForm: FormGroup) {
    if(this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      //Send the obj to the database
      this.authService.register(this.registrationForm.value)
        .subscribe({
          next: (res) => {
            //alert(res.message)
            this.snackBar.open(res.message, 'Close', {
              duration: 5000,
            });
            this.registrationForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            // alert(err?.error.message);
            this.snackBar.open(err?.error.message, 'Close', {
              duration: 5000,
            });
          }
        })
    }
  }

}
