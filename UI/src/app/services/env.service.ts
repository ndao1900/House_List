import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  env = 'dev'
  constructor() { }

  getBE_URL(){
    switch(this.env){
      case "dev":
        return "http://localhost:8080";
    }
  }
}
