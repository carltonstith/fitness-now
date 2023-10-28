import { Component, OnInit } from '@angular/core';
//reactive forms
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { confirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  public resetPasswordForm!: FormGroup;
  public emailToReset!: string;
  public emailToken!: string;
  public resetPasswordObj = new ResetPassword();
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private resetService: ResetPasswordService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },{
      validator: confirmPasswordValidator('password', 'confirmPassword')
    });
  }

  resetPassword(resetPasswordForm: FormGroup) {
    if (this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
      this.resetService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.snackBar.open(res.message, 'Close', { duration: 5000 });
        },
        error: (err) => {
          this.snackBar.open(err?.error.message, 'Close', { duration: 5000 });
        },
      });
    }
  }

  // checkValidEmail(event: string) {
  //   const value = event;
  //   const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  //   this.isValidEmail = pattern.test(value);
  //   return this.isValidEmail;
  // }
}
