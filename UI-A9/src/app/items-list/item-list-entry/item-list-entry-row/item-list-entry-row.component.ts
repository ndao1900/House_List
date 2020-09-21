import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-list-entry-row',
  templateUrl: './item-list-entry-row.component.html',
  styleUrls: ['./item-list-entry-row.component.css', '../../../app.component.css']
})
export class ItemListEntryRowComponent implements OnInit {

  @Input() canExpand:boolean;
  @Input() itemName?:string;
  @Input() quantity?:number;
  @Input() canInteract?:boolean = false;
  @Input() containerName?:string;
  @Input() daysLeft?:number;
  @Input() gridStyle={}
  @Input() displayColumns = []

  @Output() onExpand = new EventEmitter();
  @Output() onQtyChange = new EventEmitter();

  expanded:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleExpand(){
    this.expanded = !this.expanded;
    this.onExpand.emit();
  }

  handleQuantityChange(event, amount){
    event.stopPropagation();
    this.onQtyChange.emit(amount);
  }

}
