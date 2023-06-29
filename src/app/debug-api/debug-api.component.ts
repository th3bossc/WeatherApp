import { Component } from '@angular/core';
import { WeatherDataService } from '../Services/weather-data.service';

@Component({
  selector: 'app-debug-api',
  templateUrl: './debug-api.component.html',
  styleUrls: ['./debug-api.component.scss']
})
export class DebugApiComponent {
  data : any;
  constructor(private weatherapi : WeatherDataService) {}
  ngOnInit() {
    this.weatherapi.getWeather('kochi').subscribe((data) => {
      console.log(data)
      this.data = data;
    })
    // console.log(this.data)
  }
}
