import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {

  constructor(private api: ApiService) { }

  //to hold all car details
  allCars: any = []   //array(12)

  //to hold searchTerm
  searchTerm: string=""

  ngOnInit(): void {
    this.api.getAllCars().subscribe((result: any) => {
      console.log(result);    //array(12)
      this.allCars = result;
    })

    //search
    this.api.searchTerm.subscribe((result:any)=>{
      this.searchTerm = result
      console.log(this.searchTerm);

    })
  }

   search(event: any) {
    console.log(event.target.value);   //search value
    //to assign new value to behaviour subject to use next() method
    this.api.searchTerm.next(event.target.value)   //add search term to behaviour subject
  }

}

