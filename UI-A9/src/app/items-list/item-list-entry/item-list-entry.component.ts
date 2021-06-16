import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Item } from '../../data-model/item';
import { EventManager } from '@angular/platform-browser';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-item-list-entry',
  templateUrl: './item-list-entry.component.html',
  styleUrls: ['./item-list-entry.component.css','../../app.component.css']
})
export class ItemListEntryComponent implements OnInit {

  @Input() item
  @Input() highlight = {}
  @Input() gridStyle = {};
  @Input() displayColumns = [];
  @Input() readOnly = false;

  @Output() onItemSelect = new EventEmitter<{[id:number]:{[containerId:string]:boolean}}>();
  @Output() onItemHover = new EventEmitter<{[id:number]:{[containerId:string]:boolean}}>();
  @Output() onChangeQty = new EventEmitter<{containerItemId:string, newQuantity:number}>();
  expand = {container: false, createdDate: false};

  constructor(public utilSv:UtilService, public sessionSv:SessionService) { }

  ngOnInit(): void {
  }

  handleItemClick(event, quantityTargetedId?){
    event.stopPropagation();
    this.onItemSelect.emit(quantityTargetedId)
  }

  onExpandClick(which){
    this.expand[which] = !this.expand[which];
  }

  getDaysLeft(){
    try{
      const dateAdded = Date.parse(this.item.timeAdded);
      const today = new Date();
      const timeElapsed = today.getTime() - dateAdded;
      const daysElapsed = Math.ceil(timeElapsed / (1000 * 60 * 60 * 24));
      return this.getLifeSpan() - daysElapsed;
    } catch(err){
      console.error("failed to get days left", err);
      return -1;
    }
  }

  getLifeSpan(){
    return this.sessionSv.getItem(this.item.name).lifetime;
  }

  handleItemQuantityChange(containerItemId, newQuantity){
    if(!!containerItemId){
      this.onChangeQty.emit({containerItemId, newQuantity});
    } else {
      //TODO: add item with current date
    }

  }

  getTotal(quantityMap){
    return Object.values(quantityMap).reduce((total:number, value:any) => {
      if(!!value.quantityMap){
          return total + this.getTotal(value.quantityMap);
      }
      else {
        if(value.quantityMapLevel === 'createdDate'){
          return total + value.quantity
        }
        else{
          console.error("Can't find quantity for quantityMap: "+ JSON.stringify(quantityMap))
        }
      }
    }, 0)
  }

  isHighlight(highlight){
    return false;
  }
}
