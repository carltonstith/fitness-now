import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Swiper} from 'swiper/types';
import { register } from 'swiper/element';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.component.html',
  styleUrls: ['./challenge-details.component.scss']
})
export class ChallengeDetailsComponent implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor() {}

  ngAfterViewInit(): void {
    register();
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  onActiveIndexChange() {
    console.log(this.swiper?.activeIndex);
  }
}
