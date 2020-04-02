import { Component, OnInit } from '@angular/core';
import {ForecastService} from '../forecast.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}

  values: Array<string>;
  value: string;
  sortParameters: boolean;
  sortDirection: boolean;
  forecast: any;

  ngOnInit(): void {
    this.sortParameters = false;
    this.sortDirection = false;
    this.values = [
      'Date',
      'Day t',
      'Night t'
    ];
    this.value = this.values[0];
    this.forecastService.getForecast('London')
      .subscribe(response => {
        this.forecast = response;
        console.log(this.forecast.data);
      });
  }

  showSortParameters() {
    this.sortParameters = !this.sortParameters;
  }

  toggleSort(event: Event) {
    event.stopPropagation();
    this.sortDirection = !this.sortDirection;
    if (this.sortParameters) {
      this.showSortParameters();
    }
  }

  sortBy(v: string) {
    this.value = v;
    this.showSortParameters();
  }
}
