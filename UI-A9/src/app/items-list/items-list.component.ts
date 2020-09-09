import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../services/util.service';
import { SessionService } from '../services/session.service';
import { FloatingPanelContentEnum } from '../enums/floating-panel-content'
import { ItemLookupService } from '../services/item-lookup.service';
import { Item } from '../data-model/item';
import { GenericInputPanelService } from '../services/generic-input-panel.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css', '../app.component.css']
})
export class ItemsListComponent implements OnInit {
  FloatingPanelContentEnum = FloatingPanelContentEnum
  
  itemSearchTerm = "";
  @Input() itemsMap = {};
  @Input() containerName = "";
  @Input() highlight = {};
  @Output() onItemSelect = new EventEmitter<any>();
  @Output() onEditLayout = new EventEmitter<any>();
  @Output() onAddItem = new EventEmitter<any>();
  @Output() onAddQuantity = new EventEmitter<any>();

  getItemQty = false;
  
  constructor(public utilSv:UtilService, public sessionSv:SessionService, private itemLkpSv:ItemLookupService, 
    private genericInpPnlSv:GenericInputPanelService ) { }

  ngOnInit(): void {
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

  handleAddQty(quantityAdd){
    this.onAddQuantity.emit(quantityAdd);
  }

}
