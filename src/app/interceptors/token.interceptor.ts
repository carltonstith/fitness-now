import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

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
          // if a 401 error is thrown, remove the expired token and send a request to the back end to refresh the token
          if(err.status === 401) {
            // this.snackBar.open('Token is expired! Login again.', 'Close', {
            //   duration: 5000,
            // })
            // this.router.navigate(['login']);
            // handle
            return this.handleUnauthorizedError(request, next);
          }
        }
        return throwError(() => {
          new Error('Token is expired! Login again.')
          // this.snackBar.open('Token is expired! Login again.', 'Close', {
          //   duration: 5000,
          // })
        });
      })
    );
  }
  handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data: TokenApiModel) => {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        })
        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
           this.snackBar.open('Token is expired! Login again.', 'Close', {
              duration: 5000,
            })
            this.router.navigate(['login']);
        })
      })
    )
  }
}
