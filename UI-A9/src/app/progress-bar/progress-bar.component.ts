import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css', '../app.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() percentage:number;
  @Input() style;

  constructor() { }

  getStyle(){ return {...this.style, width: `${this.percentage}%`}}

  ngOnInit(): void {
  }

}
