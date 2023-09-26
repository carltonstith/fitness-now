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
      img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bnV0cml0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
    },
    {
      id: 1,
      title: 'Physical Fitness',
      content:
        'Physical fitness is the ability to function effectively throughout your workday, perform your usual other activities and still have enough energy left over to handle any extra stresses or emergencies which may arise.',
      img: 'https://images.unsplash.com/flagged/photo-1556746834-1cb5b8fabd54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGh5c2ljYWwlMjBleGVyY2lzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 2,
      title: 'Mental Fitness',
      content:
        "A person's mental fitness indicates their ability to think clearly and to make decisions efficiently and efficiently. A parallel can be drawn with physical fitness, which relates to the body's ability to function.",
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVudGFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
  ];

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((res) => (this.users = res));

    // this.service.getCategories().subscribe((data:any) => {
    //   console.log(data);
    //   this.categories = data;
    // })
    console.log('get categories from api');

    this.userStore.getFullNameFromStore().subscribe(val => {
      let fullNameFromToken = this.authService.getFullNameFromToken();

      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRolesFromStore().subscribe(val => {
      let rolesFromToken = this.authService.getRolesFromToken();

      this.role = val || rolesFromToken;
    })
  }
}
