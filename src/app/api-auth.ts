import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  'Content-Type':  'application/json',
  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmYmI1ZTE4LWVkMDktNDM0OS1hZDVmLWQ5ZDFiODNmYTExNCIsIm5hbWUiOiJDaGFybGV5IFdhbHRvbiJ9.UpaoaNWB5NViuM3FGN5qLcIFV5sI5gUODMNLemluJOY'
};

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: httpOptions
    });
    return next.handle(request);
  }
}
