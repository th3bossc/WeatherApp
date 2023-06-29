import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, mergeMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  constructor(private http : HttpClient) { }
  private apiId : string = "650ba8bd36d3a45df6fb306bcfef5cf7";
  // private secondaryapiId : string = "3f997472293794836c4607ee6cdc14f6";
  private geoDataUrl : string = "http://api.openweathermap.org/geo/1.0/direct?";
  private weatherDataUrl : string = "https://api.openweathermap.org/data/2.5/weather?";


  geoCodeApi(city : string) : Observable<any> {
    return this.http.get<any>(this.geoDataUrl + `q=${city}&appid=${this.apiId}`);
  }

  getWeather(city : string) : Observable<any> {
    return this.geoCodeApi(city).pipe(mergeMap((geocode) => {
      return this.http.get<any>(this.weatherDataUrl + `lat=${geocode[0]['lat']}&lon=${geocode[0]['lon']}&appid=${this.apiId}`);
    }));
  }

  getWeatherApi(geocode : {lat : number, lon : number}) : Observable<any> {
    return this.http.get<any>(this.weatherDataUrl + `lat=${geocode['lat']}&lon=${geocode['lon']}&appid=${this.apiId}`);
  }
}
