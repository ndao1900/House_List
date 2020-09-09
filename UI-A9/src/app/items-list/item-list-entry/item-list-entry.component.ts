import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Item } from '../../data-model/item';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-item-list-entry',
  templateUrl: './item-list-entry.component.html',
  styleUrls: ['./item-list-entry.component.css','../../app.component.css']
})
export class ItemListEntryComponent implements OnInit {

  @Input() item:any = {}
  @Input() highlight = {}
  @Output() onItemSelect = new EventEmitter<{[id:number]:{[containerId:string]:boolean}}>();
  @Output() onItemHover = new EventEmitter<{[id:number]:{[containerId:string]:boolean}}>();
  @Output() onAddQty = new EventEmitter<{containerItemId:string, amount:number}>();
  expand = {container: false, createdDate: false};

  constructor(public utilSv:UtilService) { }

  ngOnInit(): void {
  }

  canExpand(quantityMap){
    return this.getContainerItemsId(quantityMap).length > 1
  }

  handleItemClick(event, quantityTargetedId?){
    event.stopPropagation();
    this.onItemSelect.emit(quantityTargetedId)
  }

  onExpandClick(which){
    this.expand[which] = !this.expand[which];
  }

  getContainerNames(){
    return Object.values(this.item.quantityMap).map((cont:any) => cont.name).join(", ");
  }

  getDaysLeftFromQuantityMap(quantityMap):any{
    let values = Object.values(quantityMap);
    return values.reduce((dates:string[], value:any) => {
      if(value.quantityMapLevel === 'container'){
        return dates.concat(Object.keys(value.quantityMap).map(tsString => this.utilSv.getDaysLeft(tsString, this.item.lifetime).toString()))
      } else {
        console.error('Can only get dates from quantityMapLevel "container", quantityMap got: ' + JSON.stringify(value.quantityMapLevel))
        return [];
      }
    },[]);
  }

  getAllContainerQuantityMap(){
    return Object.values(this.item.quantityMap).map((cont:any) => cont.quantityMap);
  }

  getContainerItemsId(quantityMap):any{
    let values = Object.values(quantityMap);
    return  values.reduce((containerItemsIds:string[], value:any) => {
      if(!!value.quantityMap){
        return containerItemsIds.concat(this.getContainerItemsId(value.quantityMap))
      } else {
        if(!!value._id){
          return containerItemsIds.concat([value._id]);
        } else {
          console.error('can\'t find id in quantity map: ' + JSON.stringify(quantityMap))
          return null
        }
      }
    }, []);
  }

  handleAdd(event, containerItemId){
    event.stopPropagation();
    this.onAddQty.emit({containerItemId, amount: 1});
  }

  handleRemove(event, containerItemId){
    event.stopPropagation();
    this.onAddQty.emit({containerItemId, amount: -1});
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

  canInteract(quantityMap){
    this.getContainerItemsId(quantityMap).length === 1;
  }
}
