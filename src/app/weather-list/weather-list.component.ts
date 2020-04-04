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
  parameter: string;
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
    this.parameter = this.objectKeysOfParameters[0];
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
    this.sortByParameter(this.parameters[this.parameter]);
  }

  sortByParameter(parameter: string) {
    this.parameter = Object.keys(this.parameters).find(key => this.parameters[key] === parameter);
    this.showSortParameters();
    this.forecast.data.sort((a, b) => {
      if (a[parameter] > b[parameter]) {
        return this.sortDirection ? -1 : 1;
      }
      if (a[parameter] < b[parameter]) {
        return this.sortDirection ? 1 : -1;
      }
      return 0;
    });
  }
}
