import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { ViewCarsComponent } from './view-cars/view-cars.component';
import { BookingComponent } from './booking/booking.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    CarsComponent,
    AllCarsComponent,
    ViewCarsComponent,
    BookingComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ]
})
export class CarsModule { }
