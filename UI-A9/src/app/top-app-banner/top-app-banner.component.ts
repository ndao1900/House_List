import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-app-banner',
  templateUrl: './top-app-banner.component.html',
  styleUrls: ['./top-app-banner.component.css']
})
export class TopAppBannerComponent implements OnInit {

  constructor(private router:Router) {}

  ngOnInit(): void {
  }

  handleTitleClick(){
    this.router.navigate(['/']);
  }

}
