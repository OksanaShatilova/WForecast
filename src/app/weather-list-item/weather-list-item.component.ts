import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-weather-list-item',
  templateUrl: './weather-list-item.component.html',
  styleUrls: ['./weather-list-item.component.scss']
})
export class WeatherListItemComponent implements OnInit {
  @Input() day;
  constructor() { }

  ngOnInit(): void {
  }

}
