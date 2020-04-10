import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorNotificationService} from '../services/error-notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cityName: string;
  errorMessage: string;
  errorSub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private errorNotificationService: ErrorNotificationService) {}
  ngOnInit() {
    if (this.route.firstChild) {
      this.route.firstChild.params.subscribe((params) => {
        this.cityName = params.city;
      });
    }
    this.form = new FormGroup({
      city: new FormControl(this.cityName, [Validators.required])
    });
    this.errorSub = this.errorNotificationService.error$
      .subscribe(error => {
        this.errorMessage = error;
      });
  }

  submit() {
    this.errorMessage = '';
    this.cityName = this.form.get('city').value;
    this.router.navigate(['/', this.cityName]);
  }

  ngOnDestroy(): void {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
