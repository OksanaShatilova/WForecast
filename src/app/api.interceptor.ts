import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone();
    return next.handle(cloned).pipe(
      tap(event => {
        if (req.url.includes('api.weatherbit.io')) {
          const request = req.clone({
            params: req.params.set(
              'key',
              '1b2e41cc6ea548908cef9ea8499e4875'
            )
          });
          console.log(request);
          return next.handle(request);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
