import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { FloatingPanelContentEnum } from './enums/floating-panel-content'
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { Container } from './data-model/container';
import { convertObjectListToMap } from './utils/maps';
import { User } from './data-model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI-A9';
  text = "meh"
  items = ['la','di']
  FloatingPanelContentEnum = FloatingPanelContentEnum;
  showFloatingPanel = false;
  containersMap = {}


  constructor(public sessionSv:SessionService, public router:Router, public apiSv:ApiService){
  }

  ngOnInit(){
    this.apiSv.getUser()
      .then( (userRes:User) => {
        this.sessionSv.setUser(new User(userRes));
      });
  }
}