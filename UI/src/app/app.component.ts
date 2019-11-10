import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './services/env.service'
import { Container } from './data-model/container';
import { UtilService } from './services/util.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private sessionSv:SessionService, private httpClient:HttpClient, private envSv:EnvService, private utilSv:UtilService){}

  ngOnInit(){
    this.sessionSv.refreshItemStorage();
  }
}
