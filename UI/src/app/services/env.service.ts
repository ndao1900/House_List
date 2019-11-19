import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  env = 'test'
  constructor() { }

  getBE_URL(){
    switch(this.env){
      case "dev":
        return "http://localhost:8080";
      case "test":
        return "https://f649dbc9.ngrok.io"
    }
  }
}
