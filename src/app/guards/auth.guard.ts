import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import {tap} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  console.log(route);
  console.log(state);
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  const snackBar = inject(MatSnackBar);
  // console.log(token);

  // functional auth guard, not working
  // return authService.isLoggedIn().pipe(
  //   tap((token) => {
  //     return !token ? router.navigate(['login']) : true;
  //   })
  // );

  // if (token) {
  //   return true;
  // } else {
  //   router.navigate(['login']);
  //   return false;
  // }

  if(authService.isLoggedIn()) {
    return true;
  } else {
    snackBar.open('You are not logged in!', 'Close', {
      duration: 5000,
    });
    router.navigate(['login']);
    return false;
  }
}

