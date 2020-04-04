import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  form: FormGroup;
  cityName: string;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.firstChild.params.subscribe((params) => {
      this.cityName = params.city;
    });
    this.form = new FormGroup({
      city: new FormControl(this.cityName, [Validators.required])
    });
  }

  submit() {
    this.router.navigate(['/', this.form.get('city').value]);
  }
}
