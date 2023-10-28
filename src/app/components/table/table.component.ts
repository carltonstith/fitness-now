import { Component, OnInit, Output } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Categories } from 'src/app/interfaces/categories';
import { ApiService } from 'src/app/services/api.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public users: any = [];
  public fullName: string = '';
  public role: string = '';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private service: RouteService,
    private api: ApiService,
    private authService: AuthenticationService,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((res) => (
      this.users = res
    ));

    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.authService.getFullNameFromToken();

      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRolesFromStore().subscribe((val) => {
      let rolesFromToken = this.authService.getRolesFromToken();

      this.role = val || rolesFromToken;
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
