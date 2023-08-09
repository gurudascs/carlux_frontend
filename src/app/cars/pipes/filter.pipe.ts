import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allCars:any[], searchTerm:string, propertyName:string): any[] {
    
    //for holding the serarch results
    const result:any[] = [];

    if(!allCars || searchTerm == '' || propertyName == ''){
      return allCars;
    }

    allCars.forEach((item:any)=>{
      //propertyName = searchTerm
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)

      }
    })
    return result;
  }

}
