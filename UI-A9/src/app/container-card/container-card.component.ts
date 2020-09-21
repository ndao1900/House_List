import { Component, Input, OnInit } from '@angular/core';
import { Container } from '../data-model/container';

@Component({
  selector: 'app-container-card',
  templateUrl: './container-card.component.html',
  styleUrls: ['./container-card.component.css']
})
export class ContainerCardComponent implements OnInit {

  @Input() container:Container;

  constructor() { }

  ngOnInit(): void {
  }

}
