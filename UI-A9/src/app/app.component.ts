import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { FloatingPanelContentEnum } from './enums/floating-panel-content'
import { Router } from '@angular/router';

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


  constructor(public sessionSv:SessionService, public router:Router){
    window.onkeypress = (e:KeyboardEvent)=>{  if(e.key == "Escape"){ this.showFloatingPanel = false } }
  }

  handleBackDropClick(event){
    if(event.target === event.currentTarget){
      this.sessionSv.showFloatingPanel = false
    }
  }

  ngOnInit(){
    this.sessionSv.getUserData();
    // this.router.navigate(['container/1']);
  }
}
