import {Component, OnInit, OnDestroy} from '@angular/core';
import {Forecast, ForecastService} from '../services/forecast.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ErrorNotificationService} from '../services/error-notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})

export class WeatherListComponent implements OnInit {
  constructor(
    private forecastService: ForecastService,
    private route: ActivatedRoute,
    private errorNotificationService: ErrorNotificationService
  ) {}

  parameterKey: string;
  sortParametersList: boolean;
  sortDirection: boolean;
  forecastSub: Subscription;
  DAYS = 14;
  forecast: Forecast;
  parameters: object = {
    Date: 'ts',
    Temperature: 'temp'
  };
  objectKeysOfParameters = Object.keys(this.parameters);

  ngOnInit(): void {
    this.sortParametersList = false;
    this.sortDirection = false;
    this.parameterKey = this.objectKeysOfParameters[0];
    this.route.params.subscribe((params: Params) => {
      const city = params.city;
      this.forecastSub = this.forecastService.getForecast(city, this.DAYS)
        .subscribe(response => {
          if (response === null) {
            this.errorNotificationService.showErrorMessage(`City "${city}" is not found`);
          } else {
            this.forecast = response;
          }
        }, error => {
          this.errorNotificationService.showErrorMessage(error.message);
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

  ngOnDestroy(): void {
    if (this.forecastSub) {
      this.forecastSub.unsubscribe();
    }
  }
}
