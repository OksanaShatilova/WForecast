import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ForecastService} from '../forecast.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  form: FormGroup
  constructor() {
  }
  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    console.log('hhh');
  }
}
