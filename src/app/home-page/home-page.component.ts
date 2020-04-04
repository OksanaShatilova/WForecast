import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForecastService} from '../forecast.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  form: FormGroup;
  forecast: any;
  loading = false;
  error = '';
  days = 14;
  constructor(private forecastService: ForecastService) {}
  ngOnInit() {
    this.form = new FormGroup({
      city: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.error = '';
    this.loading = true;
    this.forecast = null;
    this.forecastService.getForecast(this.form.get('city').value, this.days)
      .subscribe(response => {
        if (response === null) {
          this.error = 'City is not found';
        }
        this.forecast = response;
        this.loading = false;
      }, error => {
        this.error = error.message;
        this.loading = false;
    });
  }

  clearMessages() {
    this.error = '';
  }
}
