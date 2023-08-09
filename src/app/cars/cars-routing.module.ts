import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { ViewCarsComponent } from './view-cars/view-cars.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { 
    path: '', component: AllCarsComponent 
  },
  {
    path:'viewcars/:carsId', component: ViewCarsComponent
  },
  {
    path:'booking', component: BookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
