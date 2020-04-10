import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface DataItem {
  ts: string;
  temp: string;
  datetime: string;
  weather: object;
  [propName: string]: any;
}

export interface Forecast {
  data: [DataItem];
  city_name: string;
  [propName: string]: any;
}

@Injectable({providedIn: 'root'})
export class ForecastService {
  constructor(private http: HttpClient) {
  }
  getForecast(city: string, days: number): Observable<any> {
    const params = new HttpParams()
      .set('city', city)
      .set('days', days.toString());
    return this.http.get('https://api.weatherbit.io/v2.0/forecast/daily', {params});
  }
}
