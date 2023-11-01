import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: [],
})
export class AppNavItemComponent implements OnChanges {

  constructor(public navService: NavService, public authService: AuthenticationService, public router: Router) {
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  logout() {
    this.authService.logout();
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToSettings() {
    // this.router.navigate(['/settings']);
    console.log('goToSettings');
  }
}
