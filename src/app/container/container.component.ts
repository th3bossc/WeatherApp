import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { WeatherDataService } from '../Services/weather-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DOCUMENT, formatDate } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface cityData {
  cityName : string,
  countryCode : string,
  timeZone : string,

  temp : number,
  weather : string,
  weatherDesc : string,
  icon : string,

  humidity : number,
  windSpeed : number,
  sunRise : Date,
  sunSet : Date,
};

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  animations : [
    trigger('changeBg', [
      state('start', style({
        opacity : 1
      })),
      state('end', style({
        opacity : 0
      })),
      transition('start => end', [
        animate('500ms')
      ]),
      transition('end => start', [
        animate('500ms')
      ])
    ])
  ]
})
export class ContainerComponent  implements OnInit {
  constructor(
    private weatherDataService : WeatherDataService,
    @Inject(DOCUMENT) private document : Document,
    @Inject(LOCALE_ID) private locale : string, 
  ) {}

  ngOnInit(): void {
    this.gettingData = true;
    this.wideScreen = (window.innerWidth > 1000)
    this.sidebarOpen = false;
    this.dateObject = new Date();
    this.cityInput = new FormGroup({
      city : new FormControl(null, [Validators.required])
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) 
          this.getDataFromGeoCode({lat : position.coords.latitude, lon : position.coords.longitude});
      }, (error) => {
        this.getDataFromCity('New York');
      })
    }
  }

  dateObject : Date;
  currentCity : cityData;
  targetUnit : 'F' | 'C';
  cityInput : FormGroup;
  gettingData : boolean = false;
  @ViewChild('sidePanel') sidePanel : ElementRef;
  wideScreen : boolean;
  sidebarOpen : boolean;
  majorCities : string[] = [
    "New York",
    "London",
    "Thiruvananthapuram",
    "Abu Dhabi"
  ];




  toggleUnit() {
    this.targetUnit = (this.targetUnit === 'F') ? 'C' : 'F';
  }
  
  onFormSubmit() {
    this.getDataFromCity(this.cityInput.value['city']);
    this.cityInput.reset();
  }


  getDataFromCity(input : string) {
    this.gettingData = true;
    this.weatherDataService.getWeather(input).subscribe((output) => {
      this.currentCity = {
        cityName : output['name'], 
        countryCode : output['sys']['country'], 
        timeZone : "",
        weather : output['weather'][0]['main'],
        weatherDesc : output['weather'][0]['description'],
        icon : output['weather'][0]['icon'],
        temp : output['main']['temp'],
        humidity : output['main']['humidity'],
        windSpeed : output['wind']['speed'],
        sunRise : new Date(output['sys']['sunrise']*1000 - 19800),
        sunSet : new Date(output['sys']['sunset']*1000 - 19800),
      };
      this.currentCity.timeZone = 'GMT' + this.secondOffsetToTimezone(output.timezone); 
      this.gettingData = false;
      this.document.getElementById('bg').style.backgroundImage = `url(assets/backgrounds/${this.chooseBackgroundImage(this.currentCity.icon)})`;
    }) 
    if (this.sidebarOpen)
      this.closeSideBar();
  }

  getDataFromGeoCode(input : {'lat' : number, 'lon' : number}) {
    this.gettingData = true;
    this.weatherDataService.getWeatherApi(input).subscribe((output) => {
      this.currentCity = {
        cityName : output['name'], 
        countryCode : output['sys']['country'], 
        timeZone : "",
        weather : output['weather'][0]['main'],
        weatherDesc : output['weather'][0]['desc'],
        icon : output['weather'][0]['icon'],
        temp : output['main']['temp'],
        humidity : output['main']['humidity'],
        windSpeed : output['wind']['speed'],
        sunRise : new Date(output['sys']['sunrise']*1000 - 19800),
        sunSet : new Date(output['sys']['sunset']*1000 - 19800),
      };
      this.currentCity.timeZone = 'GMT' + this.secondOffsetToTimezone(output.timezone); 
      this.gettingData = false;
      console.log(this.chooseBackgroundImage(this.currentCity.icon));
      this.document.getElementById('bg').style.backgroundImage = `url(assets/backgrounds/${this.chooseBackgroundImage(this.currentCity.icon)})`;
    }) 
    if (this.sidebarOpen)
      this.closeSideBar();
  }

  refreshData() {
    console.log(this.currentCity['cityName']);
    this.getDataFromCity(this.currentCity['cityName']);
    if (this.sidebarOpen)
      this.closeSideBar();
  }

  openSideBar() {
    this.sidePanel.nativeElement.style.width = window.innerWidth > 600 ? '600px' : '90dvw';
    this.sidebarOpen = true;
  }
  closeSideBar() {
    this.sidePanel.nativeElement.style.width = '0';
    this.sidebarOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.wideScreen = (window.innerWidth > 1000);
  }

  secondOffsetToTimezone(seconds : number) : string{
    let hours = Math.floor(seconds / 3600);
    let minutes = ((seconds / 3600) - hours)*6;
    if (hours > 0)
      return  '+' + hours + ':' + minutes + '0';
    else 
      return hours + ':' + minutes + '0'
  }

  chooseBackgroundImage(icon : string) : string {
    if (icon == '01d' || icon == '01n')
      return 'clearsky.jpg';
    else if (icon == '02d' || icon == '03d' || icon == '04d' || icon == '02n' || icon == '03n' || icon == '04n')
      return 'clouds.jpg';
    else if (icon == '09d' || icon == '09n' || icon == '10d' || icon == '10n')
      return 'rain.jpg';
    else if (icon == '11d' || icon == '11n')
      return 'thunderstorm.jpg';
    else if (icon == '13d' || icon == '13n')
      return 'snow.jpg';
    else if (icon == '50d' || icon == '50n')
      return 'mist.jpg';
    else  
      return 'clearsky.jpg';
  }

}
