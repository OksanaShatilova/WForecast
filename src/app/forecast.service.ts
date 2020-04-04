import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ForecastService {
  constructor(private http: HttpClient) {
  }
  getForecast(city: string, days: number): Observable<any> {
    return this.http.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=${days}`);
  }
}
