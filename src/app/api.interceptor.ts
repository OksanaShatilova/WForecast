import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api.weatherbit.io/v2.0/forecast')) {
      const cloned = req.clone({
        params: req.params.append('key', '1b2e41cc6ea548908cef9ea8499e4875')
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
