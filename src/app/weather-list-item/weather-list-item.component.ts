import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-weather-list-item',
  templateUrl: './weather-list-item.component.html',
  styleUrls: ['./weather-list-item.component.scss']
})
export class WeatherListItemComponent {
  @Input() day;
  daysOfWeek: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() { }

  getDayOfWeek(data: string): string {
    const day = new Date(data).getDay();
    return this.daysOfWeek[day];
  }
}
