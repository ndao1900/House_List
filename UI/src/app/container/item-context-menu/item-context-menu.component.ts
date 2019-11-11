import { Component, OnInit, Output, EventEmitter, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-item-context-menu',
  templateUrl: './item-context-menu.component.html',
  styleUrls: ['./item-context-menu.component.css']
})
export class ItemContextMenuComponent implements OnInit {

  @Input() position:{x:number;y:number}
  @Input() availableOptions:Array<ItemContextMenuOptionsEnum>
  @Output() onOptionSelect = new EventEmitter<ItemContextMenuOptionsEnum>()
  @Output() onOutsideClick = new EventEmitter<any>()
  
  ItemContextMenuOptionsEnum = ItemContextMenuOptionsEnum;
  constructor(private eRef:ElementRef) { }
  
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.onOutsideClick.emit()
    }
  }

  ngOnInit() {}

}

export enum ItemContextMenuOptionsEnum{
  DELETE = 'delete',
  EDIT = 'edit'
}
