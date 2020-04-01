import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  form: FormGroup
  ngOnInit() {
    this.form = new FormGroup({})
  }

  submit() {
    console.log('hhh')
  }
}
