import { Component, OnInit, Input } from '@angular/core';
import { HomeSlider } from '../../../shared/data/slider';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  
  public ProductImage = environment.ProductImage;

  @Input() sliders: any[];
  @Input() class: string;
  @Input() textClass: string;
  @Input() category: string;
  @Input() buttonText: string;
  @Input() buttonClass: string;

  constructor() { }

  ngOnInit(): void {
  }

  public HomeSliderConfig: any = HomeSlider;

}
