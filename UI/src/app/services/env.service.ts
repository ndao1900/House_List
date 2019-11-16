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
        return "http://ec2-54-183-228-115.us-west-1.compute.amazonaws.com"
    }
  }
}
