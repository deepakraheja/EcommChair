import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FashionOneComponent } from './fashion/fashion-one/fashion-one.component';
//import { FashionTwoComponent } from './fashion/fashion-two/fashion-two.component';
//import { FashionThreeComponent } from './fashion/fashion-three/fashion-three.component';

const routes: Routes = [
  {
    path: 'chair',
    component: FashionOneComponent
  },
  // {
  //   path: 'fashion-2',
  //   component: FashionTwoComponent
  // },
  // {
  //   path: 'fashion-3',
  //   component: FashionThreeComponent
  // },
  // {
  //   path: 'vegetable',
  //   component: VegetableComponent
  // },
  // {
  //   path: 'watch',
  //   component: WatchComponent
  // },
  // {
  //   path: 'furniture',
  //   component: FurnitureComponent
  // },
  // {
  //   path: 'flower',
  //   component: FlowerComponent
  // },
  // {
  //   path: 'beauty',
  //   component: BeautyComponent
  // },
  // {
  //   path: 'electronics',
  //   component: ElectronicsComponent
  // },
  // {
  //   path: 'pets',
  //   component: PetsComponent
  // },
  // {
  //   path: 'gym',
  //   component: GymComponent
  // },
  // {
  //   path: 'tools',
  //   component: ToolsComponent
  // },
  // {
  //   path: 'shoes',
  //   component: ShoesComponent
  // },
  // {
  //   path: 'bags',
  //   component: BagsComponent
  // },
  // {
  //   path: 'marijuana',
  //   component: MarijuanaComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
