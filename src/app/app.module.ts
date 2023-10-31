import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import Material
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout Components
import { HeaderComponent } from './layouts/full/header/header.component';
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';

// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatCheckboxModule } from '@angular/material/checkbox';

// import { RegistrationComponent } from './components/pages/registration/registration.component';
// import { LoginComponent } from './components/pages/login/login.component';

//import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
//import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TableComponent } from './components/table/table.component';
import { ResetComponent } from './components/reset/reset.component';
import { SideNavService } from './services/sidenav.service';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    FullComponent,
    HeaderComponent,
    SidebarComponent,
    AppNavItemComponent,
    // RegistrationComponent,
    // LoginComponent,
    //DashboardComponent,
    //CardComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    TableComponent,
    ResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    // MatToolbarModule,
    // MatInputModule,
    // MatButtonModule,
    // MatCardModule,
    // MatTableModule,
    // MatFormFieldModule,
    // MatGridListModule,
    // MatIconModule,
    // MatSnackBarModule,
    // MatDialogModule,
    // MatCheckboxModule,
  ],
  providers: [SideNavService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
