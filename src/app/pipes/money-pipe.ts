import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'money'})
export class MoneyFormatPipe implements PipeTransform {

    transform(amount: number, ...args: any[]) {
        return new Intl.NumberFormat("en-us", {
          minimumFractionDigits: 2,
        }).format(amount);
    }

}
