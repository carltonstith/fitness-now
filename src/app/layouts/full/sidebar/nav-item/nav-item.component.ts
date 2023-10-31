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
  // @Input() item: NavItem | any;
  // @Input() depth: any;

  constructor(public navService: NavService, public authService: AuthenticationService, public router: Router) {
    // if (this.depth === undefined) {
    //   this.depth = 0;
    // }
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  logout() {
    this.authService.logout();
    //this.router.navigate(['/login']);
  }

  // onItemSelected(item: NavItem) {
  //   if (!item.children || !item.children.length) {
  //     this.router.navigate([item.route]);
  //   }

  //   // scroll
  //   document.querySelector('.page-wrapper')?.scroll({
  //     top: 0,
  //     left: 0,
  //   });
  // }
}
