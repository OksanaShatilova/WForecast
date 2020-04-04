import {Component, OnInit} from '@angular/core';
import {ForecastService} from '../forecast.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {
  constructor(private forecastService: ForecastService, private route: ActivatedRoute) {}

  parameters: object;
  parameterKey: string;
  sortParametersList: boolean;
  sortDirection: boolean;
  forecast: object;
  days = 14;
  objectKeysOfParameters: Array<string>;

  ngOnInit(): void {
    this.sortParametersList = false;
    this.sortDirection = false;
    this.parameters = {
      Date: 'ts',
      Temperature: 'temp'
    };
    this.objectKeysOfParameters = Object.keys(this.parameters);
    this.parameterKey = this.objectKeysOfParameters[0];
    this.route.params.subscribe((params: Params) => {
      this.forecast = null;
      this.forecastService.getForecast(params.city, this.days)
        .subscribe(response => {
          this.forecast = response;
        });
    });
  }

  showSortParameters() {
    this.sortParametersList = !this.sortParametersList;
  }

  // сортировка при смене направления (возрастание/убывание)

  toggleSort(event: Event) {
    event.stopPropagation();
    this.sortDirection = !this.sortDirection;
    if (this.sortParametersList) {
      this.showSortParameters();
    }
    this.sortByParameter(this.parameterKey);
  }

  // сортировка при выборе параметра

  sortByParameter(currentKey: string) {
    this.parameterKey = currentKey;
    const parameterValue = Object.values(this.parameters).find(value => value === this.parameters[currentKey]);
    this.forecast.data.sort((a, b) => {
      if (a[parameterValue] > b[parameterValue]) {
        return this.sortDirection ? -1 : 1;
      }
      if (a[parameterValue] < b[parameterValue]) {
        return this.sortDirection ? 1 : -1;
      }
      return 0;
    });
  }
}
