import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, target : 'F'|'C'): string {
    if (target === 'C')
      return (value-273.15).toFixed() + '°C';
    else 
      return ((value-273.15)*(9/5) + 32).toFixed() + '°F';
  }

}
