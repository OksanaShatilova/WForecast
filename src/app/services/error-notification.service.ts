import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ErrorNotificationService {
  public error$ = new Subject<string>();

  showErrorMessage(text: string) {
    this.error$.next(text);
  }
}
