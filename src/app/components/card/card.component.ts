import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() categories: Array<any> = [];
  @Output() id: number = 0;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  joinChallenge(id: number) {
    console.log(`join challenge ${id}`)
    console.log(this.router.url);
    this.id = id;
    this.router.navigate(['/challenge']);
  }
}
