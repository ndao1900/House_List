import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-item-context-menu',
  templateUrl: './item-context-menu.component.html',
  styleUrls: ['./item-context-menu.component.css']
})
export class ItemContextMenuComponent implements OnInit {

  @Input() position:{x:number;y:number}
  @Output() onOptionSelect = new EventEmitter<ItemContextMenuOptionsEnum>()
  
  ItemContextMenuOptionsEnum = ItemContextMenuOptionsEnum;
  constructor() { }

  ngOnInit() {}

}

export enum ItemContextMenuOptionsEnum{
  DELETE,
  EDIT
}
