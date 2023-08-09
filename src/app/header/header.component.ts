import { Component } from '@angular/core';
import { ApiService } from '../cars/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private api: ApiService) { }

  //to hold searchTerm
  searchTerm: string = ""

  // search(event: any) {
  //   console.log(event.target.value);   //search value
  //   //to assign new value to behaviour subject to use next() method
  //   this.api.searchTerm.next(event.target.value)   //add search term to behaviour subject
  // }
}
