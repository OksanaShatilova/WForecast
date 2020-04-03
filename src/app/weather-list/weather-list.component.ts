import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {
  @Input() forecast;
  constructor() {}

  values: Array<string>;
  value: string;
  sortParameters: boolean;
  sortDirection: boolean;

  ngOnInit(): void {
    this.sortParameters = false;
    this.sortDirection = false;
    this.values = ['Date', 'Temperature'];
    this.value = this.values[0];
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
