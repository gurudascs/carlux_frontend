import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {

  constructor(private viewRoute:ActivatedRoute, private api:ApiService) { }

  carsId: string=""

  //to hold particular product details
  car:any=[]

  ngOnInit(): void {
    //to fetch parameter details
    this.viewRoute.params.subscribe((result:any)=>{
      console.log(result);             //{carsId:"4"}
      console.log(result.carsId);   //4
      this.carsId = result.carsId;

      //to fetch particular car details
      this.api.viewCar(this.carsId).subscribe((result:any)=>{
        console.log(result);
        this.car = result   //car details
        
      },
      (result:any)=>{
        console.log(result.error);   //error message
        
      })
    })
  }

  addToOrder(car:any){
    //add quantity to my orders
    Object.assign(car, {quantity:1})
    console.log(car);

    //API call to add quantity
    this.api.addToOrder(car).subscribe((result:any)=>{
      //call my orders count
      // this.api.orderCount()
      alert(result)   //add quantity to my orders
    },
    (result:any)=>{
      alert(result.error)   //error message
    }) 
  }

}
