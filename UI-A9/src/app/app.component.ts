import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { FloatingPanelContentEnum } from './enums/floating-panel-content'
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { Container } from './data-model/container';

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
    window.onkeypress = (e:KeyboardEvent)=>{  if(e.key == "Escape"){ this.showFloatingPanel = false } }
  }

  ngOnInit(){
    this.apiSv.getUserData()
      .then( (user:{_id:string; name:string}) => {
        const containerMap = user['containers'].reduce(
          (acc, container) => {
            return {...acc, [container._id]:new Container(container)}
          },
          {}
        )

        const itemHistory = user['itemHistory'].reduce(
          (acc, item) => ({...acc, [item._id]:item}),
          {}
        )

        this.sessionSv.setUser(user);
        this.sessionSv.setContainerMap(containerMap);
        this.sessionSv.setItemHistory(itemHistory);
      });
  }
}