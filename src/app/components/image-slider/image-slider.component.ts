import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent implements OnInit {
  @Input() images!: string[];
  currentIndex: number = 0;
  isPhonePortrait = false;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit() {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;

      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });
  }

  prevSlide() {
    if(this.currentIndex === 0) {
      this.currentIndex = this.images.length;
    }
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextSlide() {
    if(this.currentIndex === this.images.length - 1) {
      this.currentIndex = -1;
    }
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }
}
