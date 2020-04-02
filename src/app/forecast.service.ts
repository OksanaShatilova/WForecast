import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ForecastService {
  constructor(private http: HttpClient) {
  }
  getForecast(city: string): Observable<any> {
    return this.http.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=Moscow&key=1b2e41cc6ea548908cef9ea8499e4875`);
  }
}
