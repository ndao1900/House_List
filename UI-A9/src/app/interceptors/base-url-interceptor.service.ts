import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../services/env.service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptorService implements HttpInterceptor {
  user;
  subs;

  constructor(private enSv:EnvService, private sessionSv:SessionService) {
    this.sessionSv.getUser().subscribe(user => this.user = user);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const service = req.headers.get('service');
    switch(service){
      case SERVICES.BACKEND:{
        let newUrl = new URL(req.url, this.enSv.getBE_URL());
        if(!!this.user){
          newUrl.searchParams.append('userId',this.user._id)
        }
        return next.handle(req.clone({url:newUrl.href}));
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