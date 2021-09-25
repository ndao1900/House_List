import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../services/util.service';
import { SessionService } from '../services/session.service';
import { ItemLookupService } from '../services/item-lookup.service';
import { Container } from '../data-model/container';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css', '../app.component.css']
})
export class ItemsListComponent implements OnInit {

  itemSearchTerm = "";
  @Input() displayFields = []
  @Input() container:Container;
  @Input() highlight = {};
  @Input() readOnly = false;
  @Input() hideFields = [];

  @Output() onSelect = new EventEmitter<any>();
  @Output() onItemSelect = new EventEmitter<any>();
  @Output() onEditLayout = new EventEmitter<any>();
  @Output() onAddItem = new EventEmitter<any>();
  @Output() onQuantityChange = new EventEmitter<any>();

  getItemQty = false;
  
  constructor(public utilSv:UtilService, public sessionSv:SessionService, private itemLkpSv:ItemLookupService ) {
   }

  ngOnInit(): void {
    this.displayFields = this.displayFields.filter(col => !this.hideFields.includes(col));
  }

  shouldShow(field:string){
    if( this.displayFields.length > 0){
      return this.displayFields.some(fieldToDisplay => fieldToDisplay === field)}
    else{
      return !this.hideFields.some(fieldToHide => fieldToHide === field)}
  }

  handleItemSelected(itemContMap){
    this.onItemSelect.emit(itemContMap);
  }

  handleAddItemClick(){
    this.onAddItem.emit();
  }

  handleEditLayoutClick(){
    this.onEditLayout.emit();
  }

  handleQtyChange(quantityChange:{containerId:string, itemId:string, containerItemId:string, amount:number}){
    this.onQuantityChange.emit(quantityChange,);
  }

  handleHeaderClick(){
    this.onSelect.emit(this.container.name)
  }
}
