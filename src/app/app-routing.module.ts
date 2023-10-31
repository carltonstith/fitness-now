import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegistrationComponent } from './components/registration/registration.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AuthGuard } from './guards/auth.guard';
// import { ResetComponent } from './components/reset/reset.component';
// import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./components/pages/pages.module').then(m => m.PagesModule)
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./components/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  }
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'registration',
  //   component: RegistrationComponent
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  // {
  //   path:'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'reset',
  //   component: ResetComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
