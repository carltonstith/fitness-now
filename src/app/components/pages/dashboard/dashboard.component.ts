import { Component, OnInit, Output } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Categories } from 'src/app/interfaces/categories';
import { ApiService } from 'src/app/services/api.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public fullName: string = '';
  public role: string = '';

  constructor(
    private service: RouteService,
    private api: ApiService,
    private authService: AuthenticationService,
    private userStore: UserStoreService
  ) {}

  // @Output() categories: Categories[] = [];
  @Output() categories = [
    {
      id: 0,
      title: 'Nutritional Fitness',
      content:
        "Being nutritionally fit means finding the right “fuel” so you perform at your best. A good diet isn't just healthy and nutritious, it must also be sustainable. Trendy or gimmick diets can offer short-term success, but often are not sustainable.",
      img: 'assets/images/challenges/healthy.png',
    },
    {
      id: 1,
      title: 'Physical Fitness',
      content:
        'Physical fitness is the ability to function effectively throughout your workday, perform your usual other activities and still have enough energy left over to handle any extra stresses or emergencies which may arise.',
      img: 'assets/images/challenges/dumbbell.png',
    },
    {
      id: 2,
      title: 'Mental Fitness',
      content:
        "A person's mental fitness indicates their ability to think clearly and to make decisions efficiently and efficiently. A parallel can be drawn with physical fitness, which relates to the body's ability to function.",
      img: 'assets/images/challenges/game.png',
    },
  ];

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((res) => (
      this.users = res
    ));

    // this.service.getCategories().subscribe((data:any) => {
    //   console.log(data);
    //   this.categories = data;
    // })
    console.log('get categories from api');

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
