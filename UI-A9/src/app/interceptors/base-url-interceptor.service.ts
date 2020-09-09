import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../services/env.service';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptorService implements HttpInterceptor {

  constructor(private enSv:EnvService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const service = req.headers.get('service');
    let newUrl;
    switch(service){
      case SERVICES.BACKEND:{
        newUrl = this.enSv.getBE_URL() + req.url
        return next.handle(req.clone({url:newUrl}));
      }
      default:{
        throw new Error("in valid service in base url interceptor");
      }
    }
  }
}

export enum SERVICES{
  BACKEND = "BACKEND"
};