import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  public resetPasswordEmail!: string;
  public isValidEmail: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private resetService: ResetPasswordService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    //this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close({
      email: ''
    });
  }

  submitForgotPassword() {
    console.log(this.resetPasswordEmail);
    // submit password to the server
    this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
      next: (res: any) => {
        console.log(res);
        this.snackBar.open(res.message, 'Close', {duration: 5000})
        this.dialogRef.close({
          email: this.resetPasswordEmail
        });
      }, error: (err) => {
        this.snackBar.open(err?.error.message, 'Close', {duration: 5000});
      }
    })
    // this.dialogRef.close({
    //   email: this.resetPasswordEmail
    //   this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //       this.dialogRef.close({
    //         email: this.resetPasswordEmail
    //       });
    //     }
    //   })
    //    // API call to send email
    // });
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
    // const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  }
}
