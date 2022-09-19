import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'WhiteSpace'
})

export class WhiteSpace implements PipeTransform {
  transform(value: any, args?: any[]): any {

    var result = "";
    if (!value) {
      result = "ÁL";
    } else {
      result = value.replace(/\n/g, "<br/>");
    }
    return result;
  }
}

@Pipe({
  name: 'LongText30'
})

export class LongText30 implements PipeTransform {
  transform(value: string, args: any[]): any {

    var result = "";
    if (value.length > 30) {      
        result = value.substr(0, 30) + "...";          
    }
    else {
      result = value;
    }
    return result;
  }
}


@Pipe({
    name: 'LongText15'
})

export class LongText15 implements PipeTransform {
    transform(value: string, args: any[]): any {

        var result = "";
        if (value.length > 15) {
            result = value.substr(0, 15) + "...";
        }
        else {
            result = value;
        }
        return result;
    }
}

@Pipe({
    name: 'LongText6'
})

export class LongText6 implements PipeTransform {
    transform(value: string, args: any[]): any {

        var result = "";
        if (value.length > 6) {
            result = value.substr(0, 6) + "...";
        }
        else {
            result = value;
        }
        return result;
    }
}


@Pipe({
    name: 'orderBy'
})
export class OrderBy implements PipeTransform {

    transform(array, orderBy, asc = true) {

        if (!orderBy || orderBy.trim() == "") {
            return array;
        }

        //ascending
        if (asc) {
            return Array.from(array).sort((item1: any, item2: any) => {
                return this.orderByComparator(item1[orderBy], item2[orderBy]);
            });
        }
        else {
            //not asc
            return Array.from(array).sort((item1: any, item2: any) => {
                return this.orderByComparator(item2[orderBy], item1[orderBy]);
            });
        }

    }

    orderByComparator(a: any, b: any): number {

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }
}
