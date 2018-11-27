import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grdFilter'
})
export class GrdFilterPipe implements PipeTransform {
  transform(myobjects: Array<object>, args?: Array<object>): any {
    if(args && Array.isArray(myobjects)) {
      var returnobjects = myobjects;

      args.forEach(function (filterobj) {
        let filterkey = Object.keys(filterobj)[0];
        let filtervalue = filterobj[filterkey];
        myobjects.forEach(function (objectToFilter) {
          if(objectToFilter[filterkey] != filtervalue && filtervalue != "") {
            returnobjects = returnobjects.filter(obj => obj !== objectToFilter)
          }
        })
      });
      return returnobjects;
    }
  }
}
