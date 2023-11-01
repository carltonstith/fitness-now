import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStoreService } from 'src/app/services/user-store.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  hide = true;

  public loginUsername ='superAdmin';
  public loginPassword = 'P@ssword123';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private userStore: UserStoreService,
    public dialog: MatDialog,
    private resetService: ResetPasswordService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [this.loginUsername, Validators.required],
      password: [this.loginPassword, Validators.required],
    });
  }

  onLogIn() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (res:any) => {
            console.log(res);
            console.log(res.accessToken);
            console.log(res.message);
            // console.log((res as any).token);
            this.loginForm.reset();
            this.authService.storeToken(res.accessToken);
            this.authService.storeRefreshToken(res.refreshToken);
            const tokenPayload = this.authService.decodedToken();
            this.userStore.setFullNameInStore(tokenPayload.name);
            this.userStore.setRolesInStore(tokenPayload.role);
            this.snackBar.open(res.message, 'Close', {
              duration: 5000,
            });
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            // alert(err?.error.message)
            this.snackBar.open(err?.error.message, 'Close', {
              duration: 5000,
            });
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

  openForgotPasswordModal() {
    let dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '500px',
      panelClass: 'icon-outside',
      disableClose: true,
      data: "Hello"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.email}`);
    });
  }



}
