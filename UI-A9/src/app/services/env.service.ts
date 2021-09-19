import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  env = 'dev'
  useMockData = true;
  
  constructor() { }

  getBE_URL(){
    switch(this.env){
      case "dev":
        return "http://localhost:8080";
      case "test":
        return "https://492ccc9e.ngrok.io"
    }
  }
}
