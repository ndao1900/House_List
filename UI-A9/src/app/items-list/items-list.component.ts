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
  COLUMNS = {
    ITEM: {gridCol: 'minmax(100px, 150px)', header: "Item"},
    QUANTITY: {gridCol: '100px', header: "Qty", style:{"text-align":"center"}},
    CONTAINER: {gridCol: 'minmax(100px, 150px)', header: "Container", style:{"text-align":"center"}},
    DAYS_LEFT: {gridCol: '100px', header: "Days Left"}
  }

  itemSearchTerm = "";
  @Input() displayColumns = []
  @Input() container:Container;
  @Input() highlight = {};
  @Input() readOnly = false;
  @Input() hideColumns = [];

  @Output() onSelect = new EventEmitter<any>();
  @Output() onItemSelect = new EventEmitter<any>();
  @Output() onEditLayout = new EventEmitter<any>();
  @Output() onAddItem = new EventEmitter<any>();
  @Output() onQuantityChange = new EventEmitter<any>();

  getItemQty = false;
  
  constructor(public utilSv:UtilService, public sessionSv:SessionService, private itemLkpSv:ItemLookupService ) {
   }

  ngOnInit(): void {
    if(this.displayColumns.length === 0){
      this.displayColumns = Object.keys(this.COLUMNS)
    }
    this.displayColumns = this.displayColumns.filter(col => !this.hideColumns.includes(col));
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
    this.onSelect.emit(this.container._id)
  }

  getGridLayout(){
    let gridStyle = {
      display: 'grid',
      gridTemplateColumns: "10px" 
    }

    this.displayColumns.forEach(col => {
      gridStyle.gridTemplateColumns += ` ${this.COLUMNS[col].gridCol}`
    })

    return gridStyle;
  }

}
