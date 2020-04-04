import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {
  @Input() forecast;
  constructor() {}

  parameters: object;
  parameterKey: string;
  sortParametersList: boolean;
  sortDirection: boolean;
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
  }

  showSortParameters() {
    this.sortParametersList = !this.sortParametersList;
  }

  toggleSort(event: Event) {
    event.stopPropagation();
    this.sortDirection = !this.sortDirection;
    if (this.sortParametersList) {
      this.showSortParameters();
    }
    this.sortByParameter(this.parameterKey);
  }

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
