import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../data-model/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item:Item

  constructor() { }

  ngOnInit() {
    if(this.item == null){
      this.item = new Item();
    }
  }
}
