import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

    //to hold searchTerm
    searchTerm = new BehaviorSubject('')

  //Backend path
  BASE_URL = 'http://localhost:5000'

  //get all cars
  getAllCars(){
    return this.http.get(`${this.BASE_URL}/cars/all-cars`)
  }

   //view particular car
   viewCar(id:any){
    return this.http.get(`${this.BASE_URL}/cars/viewcars/${id}`)
  }

  //add to my orders
  addToOrder(car:any){
    const body = {
      id:car.id,
      image:car.image,
      brand:car.brand,
      price:car.price,
      type:car.type,
      quantity:car.quantity
    }
    return this.http.post(`${this.BASE_URL}/cars/booking`, body)
  }

   //get my orders
   getOrder(){
    return this.http.get(`${this.BASE_URL}/cars/getorder`)
  }

  //delete order item
  removeOrderItem(id:any){
    return this.http.delete(`${this.BASE_URL}/cars/deleteorder/${id}`)
  }
}

