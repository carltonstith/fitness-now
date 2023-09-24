import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private snackBar: MatSnackBar, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    // if(myToken) {
    //   const myNewRequest = request.clone({
    //     headers: request.headers.set('Authorization', `Bearer ${myToken}`)
    //   });
    //   return next.handle(myNewRequest);
    // }
    if(myToken) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this.snackBar.open('Token is expired! Login again.', 'Close', {
              duration: 5000,
            })
            this.router.navigate(['login']);
          }
        }
        return throwError(() => new Error('Token is expired! Login again.'));
      })
    );
  }
}
