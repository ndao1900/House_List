import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { Container } from '../data-model/container';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  containerMap={
    0:new Container({_id:0,name:'container0'}),
    1:new Container({_id:1,name:'container1'}),
    2:new Container({_id:2,name:'container2'}),
    3:new Container({_id:3,name:'container3'}),
  }

  constructor(private sessionSv:SessionService, private router:Router) { }

  ngOnInit() {
  }

  onContainerClick(container){
    this.sessionSv.setSelectedContainer(container);
    this.router.navigate(['/EditContainer'])
  }

}
