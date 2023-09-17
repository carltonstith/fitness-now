import { Component, OnInit, Output } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Categories } from 'src/app/interfaces/categories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private service: RouteService) {}

  @Output() categories: Categories[] = [];

  ngOnInit(): void {
    this.service.getCategories().subscribe((data:any) => {
      console.log(data);
      this.categories = data;
    })
  }

}
