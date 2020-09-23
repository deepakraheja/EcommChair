import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { FashionOneComponent } from './fashion/fashion-one/fashion-one.component';
//import { FashionTwoComponent } from './fashion/fashion-two/fashion-two.component';
//import { FashionThreeComponent } from './fashion/fashion-three/fashion-three.component';


// Widgest Components
import { SliderComponent } from './widgets/slider/slider.component';
import { BlogComponent } from './widgets/blog/blog.component';
import { LogoComponent } from './widgets/logo/logo.component';
import { InstagramComponent } from './widgets/instagram/instagram.component';
import { ServicesComponent } from './widgets/services/services.component';
import { CollectionComponent } from './widgets/collection/collection.component';

@NgModule({
  declarations: [
    FashionOneComponent,
    //FashionTwoComponent,
    //FashionThreeComponent,
   
    // Widgest Components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    InstagramComponent,
    ServicesComponent,
    CollectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
